import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/ui/card/Card.component';
import PlaceItem from '../item/PlaceItem.component';
import Button from '../../../components/ui/button/Button.component';
import './PlacesList.styles.scss';

const PlacesList = ({ placeItems }) => {
	if (placeItems.length === 0) {
		return (
			<div className='place-list center'>
				<Card>
					<h2>
						No places were found!
						<br/><br/><Button to='/places/new'>Share Place</Button>
					</h2>
				</Card>
			</div>
		);
	}

	const placeItemsContent = placeItems.map(placeItem => {
		return <PlaceItem key={placeItem.id} {...placeItem} />;
	});

	return <ul className='place-list'>{placeItemsContent}</ul>;
};

export default PlacesList;
