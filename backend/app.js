import express from 'express';
import PlacesRouter from './routes/places.routes.js';
import UsersRouter from './routes/users.routes.js';

const app = express();
const path = '/api/v1/';

app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).json('Welcome to impressify!')
})

app.use(`${path}places/`, PlacesRouter);
app.use(`${path}users/`, UsersRouter);

app.listen(4444);
