import React from 'react';
import UserItem from '../user-item/UserItem.component';
import css from './UsersList.styles.module.scss';

const UsersList = ({ userItems }) => {
	const noItemsToDisplayContent = (
		<div className='center'>
			<h2>No users were found...</h2>
		</div>
	);

    if(!userItems) {
        return noItemsToDisplayContent
    }

	if (userItems.length === 0) {
		return noItemsToDisplayContent;
	}
	const usersListItems = userItems.map(userItem => (
		<UserItem key={userItem.id} {...userItem} />
	));

	return <ul className={css['users-list']}>{usersListItems}</ul>;
};

export default UsersList;
