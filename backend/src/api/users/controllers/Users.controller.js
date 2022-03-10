import HttpError from '../../../errors/HttpError.js';
import User from '../models/User.schema.js';
import { validationResult } from 'express-validator';
import { displayError } from '../../../errors/Errors.controller.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

// const imageUrlPlaceHolder =
// 	'https://www.pngfind.com/pngs/m/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.png';

const getUserByID = async (req, res, next) => {
	const uid = req.params.uid;
	let user;
	try {
		user = await User.findById(uid, '-password').exec();
	} catch (error) {
		return displayError(
			'Something went wrong! Please try again.',
			500,
			next
		);
	}
	//
	if (!user)
		return displayError('Could not find a user with that id.', 400, next);
	//
	res.status(200).json({ user: user.toObject({ getters: true }) });
};
//
const getAllUsers = async (req, res, next) => {
	let users;
	//
	try {
		users = await User.find({}, '-password').exec();
	} catch (error) {
		return displayError(
			'Could not locate any users, please try again',
			500,
			next
		);
	}
	//
	if (!users) return displayError('Could not find any users', 400, next);
	//
	res.status(200).json({
		users: users.map(user => user.toObject({ getters: true })),
	});
};
//
const authenticateUser = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) throw new HttpError(`Invalid inputs!`, 422);

	const { email, password } = req.body;

	let user;

	try {
		user = await User.findOne({ email: email }).exec();
	} catch (error) {
		return displayError(
			'No user was found with those credentials.',
			401,
			next
		);
	}

	if (!user) {
		return displayError(
			'No user was found with those credentials.',
			404,
			next
		);
	}

	let isValidPassword = false;
	isValidPassword = await bcrypt.compare(password, user.password);
	if (!isValidPassword) {
		return displayError(
			'Invalid credentials, could not log you in.',
			404,
			next
		);
	}

	let token;
	try {
		token = jwt.sign(
			{
				userId: user.id,
				email: user.email,
				name: user.name,
			},
			process.env.IMPRESSIFY_SECRET_KEY,
			{ expiresIn: '1h' }
		);
	} catch (error) {
		
		return displayError(
			'Creating a new user failed, please try again.',
			500,
			next
		);
	}

	res.status(201).json({
		authenticated: true,
		user: user.toObject({ getters: true }),
		token: token
	});
};
//
const registerNewUser = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) return displayError(`Invalid inputs!`, 422, next);
	const { name, email, password } = req.body;
	let user;

	try {
		user = await User.findOne({ email: email, name: name }).exec();
	} catch (error) {
		return displayError(
			'Something went wrong, please try again!',
			422,
			next
		);
	}

	if (user)
		return displayError(
			'User exists already, please login instead',
			422,
			next
		);

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (error) {
		return displayError('Could not create user, please try again.', 500);
	}

	const newUser = new User({
		name,
		email,
		password: hashedPassword,
		imageUrl: req.file.path,
		places: [],
	});

	try {
		await newUser.save();
	} catch (error) {
		return displayError(
			'Creating a new user failed, please try again.',
			500,
			next
		);
	}

	let token;
	try {
		token = jwt.sign(
			{
				userId: newUser.id,
				email: newUser.email,
				name: newUser.name,
			},
			process.env.IMPRESSIFY_SECRET_KEY,
			{ expiresIn: '1h' }
		);
	} catch (error) {
		return displayError(
			'Creating a new user failed, please try again.',
			500,
			next
		);
	}

	res.status(201).json({
		registered: true,
		user: newUser.toObject({ getters: true }),
		token: token,
	});
};

export { getUserByID, getAllUsers, authenticateUser, registerNewUser };
