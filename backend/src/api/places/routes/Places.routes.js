import { Router } from 'express';
import { check } from 'express-validator';

import {
	getPlaceByID,
	getPlacesByUserID,
	getAllPlaces,
	createNewUserPlace,
	updateUserPlace,
	deleteUserPlace,
} from '../controllers/Places.controller.js';

const PlacesRouter = Router();

const checkBodyData = array => {
	return array;
};
const fieldsToValidate = [
	check('title').notEmpty(),
	check('description').notEmpty({ min: 5 }),
	check('address').notEmpty(),
];

const fieldsToValidateUpdate = [
	check('title').notEmpty(),
	check('description').notEmpty({ min: 5 }),
];

PlacesRouter.get('/', getAllPlaces);
PlacesRouter.get('/:id', getPlaceByID);
PlacesRouter.get('/user/:uid', getPlacesByUserID);
PlacesRouter.post('/', checkBodyData(fieldsToValidate), createNewUserPlace);
PlacesRouter.put(
	'/:id',
	checkBodyData(fieldsToValidateUpdate),
	updateUserPlace
);
PlacesRouter.delete('/:id', deleteUserPlace);

export default PlacesRouter;
