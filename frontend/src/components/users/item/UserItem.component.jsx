import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../ui/avatar/Avatar.component';
import Card from '../../ui/card/Card.component';
import { IMAGE_URL } from '../../../config/api.urls.config';
import './UserItem.styles.scss';

const UserItem = ({ id, imageUrl, name, places }) => {
	
	return (
		<li>
			<div className='user-item'>
				<Card className='user-item__content'>
					<Link to={`/${id}/places`}>
						<div className='user-item__image'>
							<Avatar
								imageUrl={`${IMAGE_URL}${imageUrl}`}
								alt={name}
							/>
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
