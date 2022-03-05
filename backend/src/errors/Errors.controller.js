import HttpError from "./HttpError.js";

const noRouteError = (req, res, next) => {
	throw new HttpError('Could not find the requested url...', 404);
};

const showError = (error, req, res, next) => {
	if (res.headerSent) return next(error);
	res.status(error.code || 500).json({
		message: error.message || 'An unknown error has occurred...',
	});
};

export {noRouteError, showError}