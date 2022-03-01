import React from 'react';
import './Places.styles.scss';
import { USER_PLACES_DATA } from '../../../data/db';
import PlacesList from '../../../components/places/list/PlacesList.component';

const Places = () => {
	return <PlacesList placeItems={USER_PLACES_DATA} />;
};

export default Places;
