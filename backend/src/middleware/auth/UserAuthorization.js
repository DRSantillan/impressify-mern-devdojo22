import { displayError } from '../../errors/Errors.controller.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const UserAuthorization = (req, res, next) => {
	if (req.method === 'OPTIONS') return next();
    
	try {
		const token = req.headers.authorization.split(' ')[1];

		if (!token) {
			throw new Error('Authentication failed...');
		}

		const decodedToken = jwt.verify(
			token,
			process.env.IMPRESSIFY_SECRET_KEY
		);
		req.userData = { user: decodedToken.user };
		next();
	} catch (error) {
		return displayError('Authentication failed...', 401, next);
	}
};

export default UserAuthorization;
