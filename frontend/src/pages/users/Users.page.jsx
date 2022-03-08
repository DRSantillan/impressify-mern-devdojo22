import { useEffect, useState } from 'react';
import UsersList from '../../components/users/list/UsersList.component';
import { USERS_URL } from '../../config/api.urls.config';
import ErrorModal from '../../components/ui/modal/error/ErrorModal.component';
import LoadingSpinner from '../../components/ui/spinner/LoadingSpinner.component';
import useHttpClient from '../../hooks/http/useHttpClient.hook';
import './Users.styles.scss';
//
const Users = () => {
	const [usersArray, setUsersArray] = useState();
	const { isLoading, errorMessage, errorHandler, httpRequest } =
		useHttpClient();
	//
	useEffect(() => {
		//
		const getAllUsers = async () => {
			//
			try {
				const data = await httpRequest(USERS_URL);
				setUsersArray(data.users);
			} catch (error) {}
		};
		//
		getAllUsers();
	}, [httpRequest]);

	

	return (
		<>
			<ErrorModal
				error={errorMessage}
				show={errorMessage}
				onClear={errorHandler}
			/>
			{isLoading && (
				<div className='center'>
					<LoadingSpinner asOverlay />
				</div>
			)}
			{!isLoading && usersArray && <UsersList userItems={usersArray} />}
		</>
	);
};

export default Users;
