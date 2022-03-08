import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import getPlaceCoordinatesFromGoogle from '../../../services/google.geocoding.api.js';
import Place from '../models/Place.schema.js';
import { displayError } from '../../../errors/Errors.controller.js';
import User from '../../users/models/User.schema.js';

//
const getAllPlaces = async (req, res, next) => {
	let places;
	//
	try {
		places = await Place.find({});
	} catch (error) {
		return displayError(
			'Could not retrieve any places, try again.',
			500,
			next
		);
	}
	//
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
	//
	try {
		place = await Place.findById(placeId).exec();
	} catch (error) {
		return displayError(
			'Something went wrong! Please try again.',
			500,
			next
		);
	}
	//
	if (!place)
		return displayError(
			'Could not find a place with the provided id.',
			400,
			next
		);
	//
	res.status(200).json({ place: place.toObject({ getters: true }) });
};
//
const getPlacesByUserID = async (req, res, next) => {
	const uid = req.params.uid;
	let allUserPlaces;
	//
	try {
		allUserPlaces = await User.findById(uid).populate('places').exec();
	} catch (error) {
		return displayError(
			'Something went wrong! Could not find any places, Please try again.',
			500,
			next
		);
	}
	//
	if (!allUserPlaces || allUserPlaces.places.length === 0)
		return displayError(
			'Could not find places with the provided user id.',
			400,
			next
		);

	res.status(200).json({
		places: allUserPlaces.places.map(place => place.toObject({ getters: true })),
	});
};
//
const createNewUserPlace = async (req, res, next) => {
	const errors = validationResult(req);
	let user;
	let place;
	//
	if (!errors.isEmpty()) return displayError(`Invalid inputs!`, 422, next);
	//
	const { title, description, imageUrl, address, creator } = req.body;
	let coordinates;
	//
	try {
		coordinates = await getPlaceCoordinatesFromGoogle(address);
	} catch (error) {
		return next(error);
	}
	//

	try {
		user = await User.findById(creator);
		console.log(user.places);
	} catch (error) {
		return displayError('Error finding that user', 500, next);
	}

	if (!user)
		return displayError('No user user found with that id', 400, next);

	//
	const newUserPlace = new Place({
		title,
		description,
		imageUrl,
		location: coordinates,
		address,
		creator,
	});
	
	try {
		place = await Place.find({});
	} catch (error) {
		return displayError(
			'Something went wrong. Please try again.',
			500,
			next
		);
	}
	
	//
	try {
		if (place.length === 0 || place.length > 0) {
			const newSession = await mongoose.startSession();
			newSession.startTransaction();
			await newUserPlace.save({ session: newSession });
			user.places.push(newUserPlace._id);
			await user.save({ session: newSession });
			await newSession.commitTransaction();
		}

		//;
	} catch (error) {
		return next(error)
		return displayError(
			'Creating a new place failed, please try again.',
			500,
			next
		);
	}
	//
	res.status(201).json({ place: newUserPlace.toObject({ getters: true }) });
};
//
const deleteUserPlace = async (req, res, next) => {
	const placeId = req.params.id;
	let placeToDelete;

	try {
		placeToDelete = await Place.findById(placeId).populate('creator').exec()
	} catch (error) {
		return displayError('Something went wrong! Please try again.', 500, next)
	}
	//
	try {
		const newSession = await mongoose.startSession()
		newSession.startTransaction()
		await placeToDelete.deleteOne( {_id: placeId, session: newSession });
		placeToDelete.creator.places.pull(placeToDelete._id);
		await placeToDelete.creator.save({session: newSession})
		newSession.commitTransaction()
	} catch (error) {
		return displayError(
			'Delete place failed, please try again.',
			500,
			next
		);
	}

	if (!placeToDelete)
		return displayError(
			'Could not find place with the provided id.',
			404,
			next
		);

	//
	res.status(201).json({
		message: 'Successfully deleted',
		placeToDelete,
	});
};
//
const updateUserPlace = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) return displayError(`Invalid inputs!`, 422, next);
	//
	const placeId = req.params.id;
	const { title, description } = req.body;
	//
	let place;
	const docToUpdate = { _id: placeId };
	const updatedData = { $set: { title: title, description: description } };
	//
	try {
		place = await Place.findOneAndUpdate(docToUpdate, updatedData);
	} catch (error) {
		return displayError(
			'Something went wrong, could not update',
			500,
			next
		);
	}
	//
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
