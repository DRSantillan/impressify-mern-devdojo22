import mongoose from 'mongoose';
import 'dotenv/config';

const MONGO_DB_URL = process.env.MONGO_DB_URL;

mongoose.connection.on('open', () => {
	console.log('MongoDB had made a successful connection to the database...');
});

mongoose.connection.on('error', error => {
	console.log('A connection error has occured.');
	console.error(error);
});

export const MongoDBConnect = async () => {
	await mongoose.connect(MONGO_DB_URL);
};

export const MongoDBDisconnect = async () => {
	await mongoose.disconnect();
};
