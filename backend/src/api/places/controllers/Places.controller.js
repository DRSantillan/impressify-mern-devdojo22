import { USER_PLACES_DATA } from '../../../data/db.js';
import HttpError from '../../../errors/HttpError.js';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';
import getPlaceCoordinatesFromGoogle from '../../../services/google.geocoding.api.js';
import Place from '../models/Place.schema.js';
import { displayError } from '../../../errors/Errors.controller.js';
const imageUrlPlaceHolder =
	'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png';
let PLACES_DB = USER_PLACES_DATA;
//
const getAllPlaces = async (req, res, next) => {
	let places;
	try {
		places = await Place.find({});
	} catch (error) {
		return displayError(
			'Could not retrieve any places, try again.',
			500,
			next
		);
	}

	if (!places)
		return displayError('There are no places to be found.', 400, next);
		//
	res.status(200).json({
		places: places.map(place => place.toObject({ getters: true })),
	});
};
//
const getPlaceByID = async (req, res, next) => {
	const placeId = req.params.id;
	let place;
	try {
		place = await Place.findById(placeId).exec();
	} catch (error) {
		return displayError(
			'Something went wrong! Please try again.',
			500,
			next
		);
	}
	if (!place)
		return displayError(
			'Could not find a place with the provided id.',
			400,
			next
		);
	res.status(200).json({ place: place.toObject({ getters: true }) });
};
//
const getPlacesByUserID = async (req, res, next) => {
	const uid = req.params.uid;
	let places;
	//
	try {
		places = await Place.find({ creator: uid }).exec();
	} catch (error) {
		return displayError(
			'Something went wrong! Could not find any places, Please try again.',
			500,
			next
		);
	}
	//
	if (!places || places.length === 0)
		return displayError(
			'Could not find places with the provided user id.',
			400,
			next
		);

	res.status(200).json({
		places: places.map(place => place.toObject({ getters: true })),
	});
};

const createNewUserPlace = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return displayError(`Invalid inputs!`, 422, next);
	//
	const { title, description, imageUrl, address, creator } = req.body;
	let coordinates;
	try {
		coordinates = await getPlaceCoordinatesFromGoogle(address);
	} catch (error) {
		return next(error);
	}
	const newUserPlace = new Place({
		title,
		description,
		imageUrl,
		location: coordinates,
		address,
		creator,
	});

	try {
		await newUserPlace.save();
	} catch (error) {
		return displayError(
			'Creating a new place failed, please try again.',
			500,
			next
		);
	}
	res.status(201).json({ place: newUserPlace.toObject({ getters: true }) });
};

const deleteUserPlace = async (req, res, next) => {
	const placeId = req.params.id;

	//	throw new HttpError('Could not find a place with that id.', 404);
	let placeToDelete;
	try {
		placeToDelete = await Place.deleteOne({ _id: placeId }).exec();
	} catch (error) {
		return displayError(
			'Delete place failed, please try again.',
			500,
			next
		);
	}

	res.status(201).json({
		message: 'Successfully deleted',
		placeToDelete,
	});
};

const updateUserPlace = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return displayError(`Invalid inputs!`, 422, next);

	const placeId = req.params.id;
	const { title, description } = req.body;

	let place;
	const docToUpdate = { _id: placeId };
	const updatedData = { $set: { title: title, description: description } };
	try {
		place = await Place.findOneAndUpdate(docToUpdate, updatedData);
	} catch (error) {
		return displayError(
			'Something went wrong, could not update',
			500,
			next
		);
	}

	res.status(201).json({ place: place.toObject({ getters: true }) });
};

export {
	getPlaceByID,
	getPlacesByUserID,
	getAllPlaces,
	createNewUserPlace,
	updateUserPlace,
	deleteUserPlace,
};
