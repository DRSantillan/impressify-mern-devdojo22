import { useState, useEffect, useCallback } from 'react';
let logOutTimer;
const useAuthorization = () => {
	const [authToken, setAuthToken] = useState(false);
	const [userId, setUserId] = useState(null);
	const [tokenExpirationDate, setTokenExpirationDate] = useState();

	const loginUser = useCallback((uid, token, expirationDate) => {
		setAuthToken(token);
		setUserId(uid);
		const tokenExpirationDate =
			expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(tokenExpirationDate);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: uid,
				token: token,
				expiration: tokenExpirationDate.toISOString(),
			})
		);
	}, []);

	const logoutUser = useCallback(uid => {
		setAuthToken(null);
		setUserId(null);
		setTokenExpirationDate(null);
		localStorage.removeItem('userData');
	}, []);

	// this hook helps with logout the user automatically
	useEffect(() => {
		if (authToken && tokenExpirationDate) {
			const remainingTime =
				tokenExpirationDate.getTime() - new Date().getTime();
			logOutTimer = setTimeout(logoutUser, remainingTime);
		} else {
			clearTimeout(logOutTimer);
		}
	}, [authToken, logoutUser, tokenExpirationDate]);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData'));
		if (
			storedData &&
			storedData.token &&
			new Date(storedData.expiration) > new Date()
		) {
			loginUser(
				storedData.userId,
				storedData.token,
				new Date(storedData.expiration)
			);
		}
	}, [loginUser]);

	return { loginUser, logoutUser, authToken, userId };
};

export default useAuthorization;
