class HttpError extends Error {
	constructor(message, ErrorCode) {
		super(message);
		this.code = ErrorCode;
	}
}

export default HttpError;
