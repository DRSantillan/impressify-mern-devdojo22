import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	imageUrl: { type: String, required: true },
	places: { type: Number },
});

export default model('Users', userSchema);
