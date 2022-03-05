import express from 'express';
import { USER_PLACES_DATA } from '../data/db.js';

const router = express.Router();

router.get('/', (req, res, next) => {
	console.log('get request');
	res.status(200).json({ message: 'Places' });
});

router.get('/:id', (req, res, next) => {
	const placeId = req.params.id;
	const place = USER_PLACES_DATA.find(place => place.id === placeId);
	console.log('get request');
	res.status(200).json({ place });
});

export default router;
