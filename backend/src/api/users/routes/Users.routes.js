import express from 'express';
import HttpError from '../../../errors/HttpError.js';
import { USERS_DATA } from '../../../data/db.js'

const UsersRouter = express.Router();

UsersRouter.get('/', (req, res, next) => {
	console.log('get request for users');
	res.status(200).json({ message: 'Users' });
});

UsersRouter.get('/:uid', (req, res, next) => {
	console.log('get a user by id');
	const uid = req.params.uid;
	const user = USERS_DATA.find(user => user.id === uid);

	res.status(200).json({ user });
});

export default UsersRouter;
