import axios from 'axios';
import 'dotenv/config'

import HttpError from '../errors/HttpError.js';

const getPlaceCoordinatesFromGoogle = async address => {
	const GEOCODE_URI = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
		address
	)}&key=${process.env.GOOGLE_API_KEY}`;
	const response = await axios.get(GEOCODE_URI);
	const data = response.data;
    console.log(data)
	if (!data || data.status === 'ZERO_RESULTS')
		throw new HttpError(
			'Could not retrieve the geolocation data for that specified address.',
			422
		);

	const coordinates = data.results[0].geometry.location;

	return coordinates;
};

export default getPlaceCoordinatesFromGoogle;