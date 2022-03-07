import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const placeSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	imageUrl: { type: String, required: true },
	address: { type: String, required: true },
	location: {
		lat: { type: String, required: true },
		lng: { type: String, required: true },
	},
	creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

export default model('Place', placeSchema);
