// server config
const PORT = 4444;
const SERVER_URL = 'http://localhost';
// path data
const API_PATH_V1 = '/api/v1';
const USERS_ROUTE = '/users';
const PLACES_ROUTE = '/places';

const API_URL = `${SERVER_URL}:${PORT}${API_PATH_V1}`;
const API_USERS_ROUTE_URL = `${API_URL}${USERS_ROUTE}`;
const API_PLACES_ROUTE_URL = `${API_URL}${PLACES_ROUTE}`;

const USERS_URL = `${API_USERS_ROUTE_URL}/`;
const GET_USER_BY_ID_URL = `${USERS_URL}`;
const REGISTER_NEW_USER_URL = `${USERS_URL}register`;
const AUTHENTICATE_USER_URL = `${USERS_URL}authenticate`;

const PLACES_URL = `${API_PLACES_ROUTE_URL}/`;
const GET_PLACE_BY_ID_URL = `${PLACES_URL}`;
const GET_PLACES_BY_USER_ID_URL = `${PLACES_URL}user/`;
const CREATE_NEW_USER_PLACE_URL = `${PLACES_URL}`;
const UPDATE_USER_PLACE_URL = `${PLACES_URL}`;
const DELETE_USER_PLACE_URL = `${PLACES_URL}`;
const IMAGE_URL = 	`${SERVER_URL}:${PORT}/`

export {
	IMAGE_URL,
	USERS_URL,
	GET_USER_BY_ID_URL,
	REGISTER_NEW_USER_URL,
	AUTHENTICATE_USER_URL,
	PLACES_URL,
	GET_PLACE_BY_ID_URL,
	GET_PLACES_BY_USER_ID_URL,
	CREATE_NEW_USER_PLACE_URL,
	UPDATE_USER_PLACE_URL,
	DELETE_USER_PLACE_URL,
};
