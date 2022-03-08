import { useState, useCallback, useRef, useEffect } from 'react';

const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	const activeHttpRequests = useRef([]);

	const httpRequest = useCallback(
		async (url, method = 'GET', body = null, headers = {}) => {
			setIsLoading(true);
			const httpAbortControl = new AbortController();
			activeHttpRequests.current.push(httpAbortControl);
			//
			try {
				const response = await fetch(url, {
					method,
					body,
					headers,
					signal: httpAbortControl.signal
				});
				const data = await response.json();

				activeHttpRequests.current = activeHttpRequests.current.filter(
					controller => controller !== httpAbortControl
				);

				if (!response.ok) throw new Error(data.message);
				setIsLoading(false);
				return data;
			} catch (error) {
				setErrorMessage(error.message);
				setIsLoading(false);
				throw error;
			}
		},
		[]
	);

	const errorHandler = () => {
		setErrorMessage(null);
	};

	useEffect(() => {
		return () => {
			activeHttpRequests.current.forEach(abortControl =>
				abortControl.abort()
			);
		};
	}, []);
	return { errorHandler, errorMessage, isLoading, httpRequest };
};

export default useHttpClient;
