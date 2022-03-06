import express from 'express';
import HttpError from './src/errors/HttpError.js';
import PlacesRouter from './src/api/places/routes/Places.routes.js'
import UsersRouter from './src/api/users/routes/Users.routes.js'
import { noRouteError, showError } from './src/errors/Errors.controller.js';

const app = express();
const path = '/api/v1/';
const PORT = 4444
const SERVER_URL = 'http://localhost'

app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).json('Welcome to impressify!')
})

app.use(`${path}places`, PlacesRouter);
app.use(`${path}users`, UsersRouter);

// handle incorrect routes middleware
app.use(noRouteError);
app.use(showError)

app.listen(4444, () => {
    console.log(`Impressify API Server is up and running on ${SERVER_URL}:${PORT}`)
});
