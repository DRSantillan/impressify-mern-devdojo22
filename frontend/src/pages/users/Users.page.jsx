import React from 'react';
import './Users.styles.scss';
import UsersList from '../../components/users/list/UsersList.component';
import { USERS_DATA } from '../../data/db';

const Users = () => {
	
	return <UsersList userItems={USERS_DATA} />;
};

export default Users;
