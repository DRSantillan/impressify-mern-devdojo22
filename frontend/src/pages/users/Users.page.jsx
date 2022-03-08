import { useEffect, useState } from 'react';
import './Users.styles.scss';
import UsersList from '../../components/users/list/UsersList.component';
import { USERS_URL } from '../../config/api.urls.config';
import { USERS_DATA } from '../../data/db';
import ErrorModal from '../../components/ui/modal/error/ErrorModal.component';
import LoadingSpinner from '../../components/ui/spinner/LoadingSpinner.component';

const Users = () => {
	const [usersArray, setUsersArray] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	const errorHandler = () => {
		setErrorMessage(null);
	};

	useEffect(() => {
		const getAllUsers = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(USERS_URL);
				const data = await response.json();
				//if (!response.ok) throw new Error(data.message);
				console.log(data.users);
				setUsersArray(data.users);
				setIsLoading(false);
			} catch (error) {
				setErrorMessage(error.message);
			}
			setIsLoading(false);
		};
		getAllUsers();
	}, []);

	console.log(usersArray);

	return (
		<>
			<ErrorModal
				error={errorMessage}
				show={errorMessage}
				onClear={errorHandler}
			/>
			{isLoading && <div className='center'><LoadingSpinner asOverlay /></div>}
			{!isLoading && usersArray && <UsersList userItems={usersArray} />}
		</>
	);
};

export default Users;
