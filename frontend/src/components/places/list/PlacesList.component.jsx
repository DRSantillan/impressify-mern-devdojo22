import React from 'react';
import PlaceItem from '../item/PlaceItem.component';
import './PlacesList.styles.scss';
import NoDataDisplay from '../no-data/NoDataDisplay.component';

const PlacesList = ({ placeItems, onDelete }) => {
	if (placeItems.length === 0) {
		return (
			<NoDataDisplay/>
		);
	}
	

	const placeItemsContent = placeItems.map(placeItem => {
		return <PlaceItem key={placeItem.id} onDelete={onDelete} {...placeItem} />;
	});

	return <ul className='place-list'>{placeItemsContent}</ul>;
};

export default PlacesList;
