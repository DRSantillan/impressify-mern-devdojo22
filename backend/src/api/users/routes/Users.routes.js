import express from 'express';
import { getUserByID, getAllUsers } from '../controllers/Users.controller.js';

const UsersRouter = express.Router();

UsersRouter.get('/', getAllUsers);
UsersRouter.get('/:uid', getUserByID);

export default UsersRouter;
