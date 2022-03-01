import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../ui/avatar/Avatar.component';
import Card from '../../ui/card/Card.component';
import css from './UserItem.styles.module.scss';

const UserItem = ({ id, imageUrl, name, places }) => {
	return (
		<li>
			<div className={css['user-item']}>
				<Card className={css['user-item__content']}>
					<Link to={`/${id}/places`}>
						<div className={css['user-item__image']}>
							<Avatar imageUrl={imageUrl} alt={name} />
						</div>
						<div className={css['user-item__info']}>
							<h2>{name}</h2>
							<h3>{places} Places</h3>
						</div>
					</Link>
				</Card>
			</div>
		</li>
	);
};

export default UserItem;
