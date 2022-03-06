import { Router } from 'express';
import PlacesRouter from './places/routes/Places.routes.js';
import UsersRouter from './users/routes/Users.routes.js';

const routerV1 = Router();

routerV1.use('/places', PlacesRouter);
routerV1.use('/users', UsersRouter);

export default routerV1;
