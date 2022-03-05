import { USER_PLACES_DATA } from '../../../data/db.js';
import HttpError from '../../../errors/HttpError.js';
import { v4 as uuidv4 } from 'uuid';
//
const getAllPlaces = (req, res, next) => {
	const places = USER_PLACES_DATA;

	if (!places) throw new HttpError('There are no places to be found.', 400);
	res.status(200).json({ places });
};
//
const getPlaceByID = (req, res, next) => {
	const placeId = req.params.id;
	const place = USER_PLACES_DATA.find(place => place.id === placeId);
	if (!place)
		throw new HttpError(
			'Could not find a place with the provided id.',
			400
		);

	res.status(200).json({ place });
};
//
const getPlaceByUserID = (req, res, next) => {
	const uid = req.params.uid;
	const place = USER_PLACES_DATA.find(place => place.creator === uid);

	if (!place)
		throw new HttpError(
			'Could not find a place with the provided user id.',
			400
		);

	res.status(200).json({ place });
};

const createNewUserPlace = (req, res, next) => {
	const { title, description, imageUrl, coordinates, address, creator } =
		req.body;
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

	USER_PLACES_DATA.push(newUserPlace);
	res.status(201).json({ place: newUserPlace });
};

const deleteUserPlace = (req,res,next) => {
	const placeId = req.params.id;
	console.log(placeId)

}

const updateUserPlace = (req, res, next) => {
	const placeId = req.params.id;
	const { title, description, imageUrl, coordinates, address, creator } =
		req.body;
	
	const placeToUpdate = USER_PLACES_DATA.find(place => place.id === placeId)
	const updatePlace = {
		...placeToUpdate,
		title,
		description,
		imageUrl,
		coordinates,
		address,
		creator,
	};
	console.log(placeToUpdate, ',,,')
	console.log(updatePlace, ',,,');

	console.log(placeId, req.body);
};

export {
	getPlaceByID,
	getPlaceByUserID,
	getAllPlaces,
	createNewUserPlace,
	updateUserPlace,
	deleteUserPlace
};
