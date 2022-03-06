import { Router } from 'express';
import { check } from 'express-validator';
import {
	getUserByID,
	getAllUsers,
	registerNewUser,
	authenticateUser,
} from '../controllers/Users.controller.js';

const UsersRouter = Router();

const registerToValidate = [
	check('email').notEmpty().normalizeEmail().isEmail(),
	check('password').notEmpty().isLength({min: 8}),
	check('name').notEmpty(),
];
const authToValidate = [
	check('email').notEmpty().normalizeEmail().isEmail(),
	check('password').notEmpty().isLength({ min: 8 }),
];

const checkBodyData = array => {
	return array;
};

UsersRouter.get('/', getAllUsers);
UsersRouter.get('/:uid', getUserByID);
UsersRouter.post(
	'/register',
	checkBodyData(registerToValidate),
	registerNewUser
);
UsersRouter.post(
	'/authenticate',
	checkBodyData(authToValidate.pop()),
	authenticateUser
);

export default UsersRouter;
