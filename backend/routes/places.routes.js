import express from 'express';
import HttpError from '../models/error/HttpError.model.js';
import { USER_PLACES_DATA } from '../data/db.js';

const router = express.Router();

router.get('/', (req, res, next) => {
	res.status(200).json({ message: 'Places' });
});

router.get('/:id', (req, res, next) => {
	const placeId = req.params.id;
	const place = USER_PLACES_DATA.find(place => place.id === placeId);
	if (!place)
		throw new HttpError(
			'Could not find a place with the provided id.',
			400
		);

	res.status(200).json({ place });
});

router.get('/user/:uid', (req, res, next) => {
	const uid = req.params.uid;
	const place = USER_PLACES_DATA.find(place => place.creator === uid);

	if (!place)
		throw new HttpError(
			'Could not find a place with the provided user id.',
			400
		);

	res.status(200).json({ place });
});

export default router;
