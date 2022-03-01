import React from 'react';
import './PlaceItem.styles.scss';
import Card from '../../ui/card/Card.component';

const PlaceItem = ({id, imageUrl, title, address, description, creatorId, coordinates}) => {
	return (
		<li className='place-item'>
			<Card className='place-item__content'>
				<div className='place-item__image'>
					<img src={imageUrl} alt={title} />
				</div>
				<div className='place-item__info'>
					<h2>{title}</h2>
					<h3>{address}</h3>
					<p>{description}</p>
				</div>
				<div className='place-item__actions'>
					<button>View On Map</button>
					<button>Edit</button>
					<button>Delete</button>
				</div>
			</Card>
		</li>
	);
};

export default PlaceItem;
