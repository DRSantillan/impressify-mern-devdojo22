import { USERS_DATA } from '../../../data/db.js';
import HttpError from '../../../errors/HttpError.js';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';

let USERS_DB = USERS_DATA;
console.log(USERS_DB);
//
const getUserByID = (req, res, next) => {
	const uid = req.params.uid;
	const user = USERS_DB.find(user => user.id === uid);

	if (!user)
		throw new HttpError('Could not find a user with the provided ID.', 400);

	res.status(200).json({ user });
};
//
const getAllUsers = (req, res, next) => {
	const users = USERS_DB;
	if (!users) throw new HttpError('Could not find any users', 400);
	res.status(200).json({ users });
};

const authenticateUser = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw new HttpError(`Invalid inputs!`, 422);
	const { email, password } = req.body;
	const user = USERS_DB.find(
		user => user.email === email && user.password === password
	);
	if (!user)
		throw new HttpError('No user was found with those credentials.', 401);
	res.status(201).json({ authenticated: true, user: user });
};

const registerNewUser = (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) throw new HttpError(`Invalid inputs!`, 422);
	const { name, email, password } = req.body;
	const user = USERS_DB.filter(
		user => user.email === email && user.name === name
	);
	console.log(user);
	if (user.length > 0)
		throw new HttpError(
			'There already is a user with those credentials',
			422
		);
	const newUser = {
		id: uuidv4(),
		name,
		email,
		password,
	};
	USERS_DATA.push(newUser);
	res.status(201).json({ registered: true, user: newUser });
};

export { getUserByID, getAllUsers, authenticateUser, registerNewUser };
