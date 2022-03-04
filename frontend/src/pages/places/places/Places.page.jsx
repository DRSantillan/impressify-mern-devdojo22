import React from 'react';
import { useParams } from 'react-router-dom';
import './Places.styles.scss';
import { USER_PLACES_DATA } from '../../../data/db';
import PlacesList from '../../../components/places/list/PlacesList.component';


const Places = () => {
	const userId = useParams().userId;
	const userPlaces = USER_PLACES_DATA.filter(
		place => place.creator === userId
	);
	return <PlacesList placeItems={userPlaces} />;
};

export default Places;
