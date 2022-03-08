import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../../../components/ui/card/Card.component';
import PlaceItem from '../item/PlaceItem.component';
import Button from '../../../components/ui/button/Button.component';
import './PlacesList.styles.scss';
import NoDataDisplay from '../no-data/NoDataDisplay.component';

const PlacesList = ({ placeItems }) => {
	console.log(placeItems)
	if (placeItems.length === 0) {
		return (
			<NoDataDisplay/>
		);
	}

	const placeItemsContent = placeItems.map(placeItem => {
		return <PlaceItem key={placeItem.id} {...placeItem} />;
	});

	return <ul className='place-list'>{placeItemsContent}</ul>;
};

export default PlacesList;
