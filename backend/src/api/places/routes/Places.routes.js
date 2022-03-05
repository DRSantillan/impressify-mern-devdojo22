import express from 'express';
import {
	getPlaceByID,
	getPlaceByUserID,
	getAllPlaces,
	createNewUserPlace,
	updateUserPlace,
	deleteUserPlace,
} from '../controllers/Places.controller.js';

const PlacesRouter = express.Router();

PlacesRouter.get('/', getAllPlaces);
PlacesRouter.get('/:id', getPlaceByID);
PlacesRouter.get('/user/:uid', getPlaceByUserID);
PlacesRouter.post('/', createNewUserPlace);
PlacesRouter.put('/:id', updateUserPlace);
PlacesRouter.delete('/:id', deleteUserPlace)

export default PlacesRouter;
