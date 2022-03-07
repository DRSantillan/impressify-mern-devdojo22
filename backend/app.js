import express from 'express';
import { noRouteError, showError } from './src/errors/Errors.controller.js';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import routerV1 from './src/api/api.v1.routes.js';
import { path, PORT, SERVER_URL } from './src/config/index.config.js';
import { MongoDBConnect } from './src/services/mongo.db.js';

// initialize express
const app = express();
// middleware
app.use(cors({ origin: `${SERVER_URL}:${PORT}` }));
app.use(express.json());
app.use(morgan('combined'));

// routes
app.get('/', (req, res) => {
	res.status(200).json('Welcome to impressify!');
});

// API Router version 1.0
app.use(path, routerV1);

// handle incorrect routes middleware
app.use(noRouteError);
app.use(showError);

// app.listen(PORT, () => {
// 	console.log(
// 		`Impressify API Server is up and running on ${SERVER_URL}:${PORT}`
// 	);
// });

const startAPIServer = async () => {
	await MongoDBConnect();
	app.listen(PORT, () => {
		console.log(
			`Impressify API Server is up and running on ${SERVER_URL}:${PORT}`
		);
	});
};

startAPIServer()
