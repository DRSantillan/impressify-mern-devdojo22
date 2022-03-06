import { USER_PLACES_DATA } from '../../../data/db.js';
import HttpError from '../../../errors/HttpError.js';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';
import getPlaceCoordinatesFromGoogle from '../../../services/google.geocoding.api.js';

let PLACES_DB = USER_PLACES_DATA;
//
const getAllPlaces = (req, res, next) => {
	const places = PLACES_DB;

	if (!places) throw new HttpError('There are no places to be found.', 400);
	res.status(200).json({ places });
};
//
const getPlaceByID = (req, res, next) => {
	const placeId = req.params.id;
	const place = PLACES_DB.find(place => place.id === placeId);
	if (!place)
		throw new HttpError(
			'Could not find a place with the provided id.',
			400
		);

	res.status(200).json({ place });
};
//
const getPlacesByUserID = (req, res, next) => {
	const uid = req.params.uid;
	const places = PLACES_DB.filter(place => place.creator === uid);

	if (!places || places.length === 0)
		throw new HttpError(
			'Could not find a place with the provided user id.',
			400
		);

	res.status(200).json({ places });
};
const errorMessages = errors => {
	// look into implementing a better error function with this
};

const createNewUserPlace = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return next(new HttpError(`Invalid inputs!`, 422));
	//
	const { title, description, imageUrl, address, creator } = req.body;
	let coordinates;
	try {
		coordinates = await getPlaceCoordinatesFromGoogle(address);
	} catch (error) {
		return next(error);
	}

	const id = uuidv4();

	const newUserPlace = {
		id,
		title,
		description,
		imageUrl,
		location: coordinates,
		address,
		creator,
	};

	PLACES_DB.push(newUserPlace);
	res.status(201).json({ place: newUserPlace });
};

const deleteUserPlace = (req, res, next) => {
	const placeId = req.params.id;
	if (!PLACES_DB.find(place => place.id === placeId))
		throw new HttpError('Could not find a place with that id.', 404);

	PLACES_DB = PLACES_DB.filter(place => place.id !== placeId);

	res.status(201).json({
		message: 'Successfully deleted',
		places: PLACES_DB,
	});
};

const updateUserPlace = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw new HttpError(`Invalid inputs!`, 422);

	const placeId = req.params.id;
	const { title, description } = req.body;

	// get the place to update and put into a new object to work with without directly updating the current state
	const placeToUpdate = PLACES_DB.find(place => place.id === placeId);
	// get the index of the object in the array to update later with new data
	const placeIndex = PLACES_DB.findIndex(place => place.id === placeId);
	// create a new object and spread the previous object state and add the updated fields
	const updatedPlace = {
		...placeToUpdate,
		title,
		description,
	};
	// now locate the object to be updated with the new state object
	PLACES_DB[placeIndex] = updatedPlace;

	res.status(201).json({ place: updatedPlace });
};

export {
	getPlaceByID,
	getPlacesByUserID,
	getAllPlaces,
	createNewUserPlace,
	updateUserPlace,
	deleteUserPlace,
};
