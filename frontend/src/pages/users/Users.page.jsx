import React from 'react';
import css from './Users.styles.module.scss';
import UsersList from '../../components/users/users-list/UsersList.component';

const Users = () => {
	const USERS_DATA = [
		{
			id: '39883dkj',
			name: 'Harumi Santillan',
			imageUrl:
				'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=836&q=80',
			places: 3,
		},
		{
			id: '49889045jr',
			name: 'Dean Santillan',
			imageUrl:
				'https://images.unsplash.com/photo-1534008897995-27a23e859048?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
			places: 3,
		},
	];
	return <UsersList userItems={USERS_DATA} />;
};

export default Users;
