import React from 'react';
import UserItem from '../user-item/UserItem.component';
import Card from '../../ui/card/Card.component';
import './UsersList.styles.scss';

const UsersList = ({ userItems }) => {
	const noItemsToDisplayContent = (
		<div className='center'>
			<Card>
				<h2>No users were found...</h2>
			</Card>
		</div>
	);

	if (!userItems) {
		return noItemsToDisplayContent;
	}

	if (userItems.length === 0) {
		return noItemsToDisplayContent;
	}
	const usersListItems = userItems.map(userItem => (
		<UserItem key={userItem.id} {...userItem} />
	));

	return <ul className='users-list'>{usersListItems}</ul>;
};

export default UsersList;
