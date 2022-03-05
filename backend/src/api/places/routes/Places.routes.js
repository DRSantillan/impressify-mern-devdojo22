import express from 'express';
import HttpError from '../../../errors/HttpError.js';
import { USER_PLACES_DATA } from '../../../data/db.js'

const PlacesRouter = express.Router();

PlacesRouter.get('/', (req, res, next) => {
	res.status(200).json({ message: 'Places' });
});

PlacesRouter.get('/:id', (req, res, next) => {
	const placeId = req.params.id;
	const place = USER_PLACES_DATA.find(place => place.id === placeId);
	if (!place)
		throw new HttpError(
			'Could not find a place with the provided id.',
			400
		);

	res.status(200).json({ place });
});

PlacesRouter.get('/user/:uid', (req, res, next) => {
	const uid = req.params.uid;
	const place = USER_PLACES_DATA.find(place => place.creator === uid);

	if (!place)
		throw new HttpError(
			'Could not find a place with the provided user id.',
			400
		);

	res.status(200).json({ place });
});

export default PlacesRouter;
