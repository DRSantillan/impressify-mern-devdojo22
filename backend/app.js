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

app.use((error, req, res, next)=>{
    if(res.headerSent) return next(error)
    res.status(error.code || 500).json({message: error.message || 'An unknown error has occurred...'})
})

app.listen(4444);
