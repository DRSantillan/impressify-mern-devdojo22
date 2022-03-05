import { USERS_DATA } from '../../../data/db.js';
import HttpError from '../../../errors/HttpError.js';
//
const getUserByID = (req, res, next) => {
	const uid = req.params.uid;
	const user = USERS_DATA.find(user => user.id === uid);

	if (!user)
		throw new HttpError('Could not find a user with the provided ID.', 400);

	res.status(200).json({ user });
};
//
const getAllUsers = (req, res, next) => {
	const users = USERS_DATA;
	if (!users) throw new HttpError('Could not find any users', 400);
	res.status(200).json({ users });
};

export { getUserByID, getAllUsers };
