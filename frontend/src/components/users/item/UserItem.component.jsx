import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../ui/avatar/Avatar.component';
import Card from '../../ui/card/Card.component';
import './UserItem.styles.scss';

const UserItem = ({ id, imageUrl, name, places }) => {
	
	return (
		<li>
			<div className='user-item'>
				<Card className='user-item__content'>
					<Link to={`/${id}/places`}>
						<div className='user-item__image'>
							<Avatar imageUrl={imageUrl} alt={name} />
						</div>
						<div className='user-item__info'>
							<h2>{name}</h2>
							<h3>{places.length} Places</h3>
						</div>
					</Link>
				</Card>
			</div>
		</li>
	);
};

export default UserItem;
