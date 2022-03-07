import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const { Schema, model } = mongoose;

const userSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	imageUrl: { type: String, required: true },
	places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }],
});

userSchema.plugin(uniqueValidator)

export default model('Users', userSchema);
