import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../../components/ui/modal/error/ErrorModal.component';
import LoadingSpinner from '../../../components/ui/spinner/LoadingSpinner.component';
import './Places.styles.scss';

import PlacesList from '../../../components/places/list/PlacesList.component';
import useHttpClient from '../../../hooks/http/useHttpClient.hook';
import { GET_PLACES_BY_USER_ID_URL } from '../../../config/api.urls.config';
import NoDataDisplay from '../../../components/places/no-data/NoDataDisplay.component';

const Places = () => {
	const [userPlaces, setUserPlaces] = useState();
	const navigate = useNavigate();
	const { httpRequest, errorMessage, isLoading, errorHandler } =
		useHttpClient();
	const userId = useParams().userId;

	useEffect(() => {
		const getPlacesByUserId = async () => {
			try {
				const data = await httpRequest(
					`${GET_PLACES_BY_USER_ID_URL}${userId}`
				);

				setUserPlaces(data.places);
			} catch (error) {}
		};
		getPlacesByUserId();
	}, [httpRequest, userId]);

	const onDeletePlaceHandler = deletedPlaceId => {
		setUserPlaces(prevPlaces =>
			prevPlaces.filter(place => place.id !== deletedPlaceId)
		);
	};
	return (
		<>
			<ErrorModal
				error={errorMessage}
				show={errorMessage}
				onClear={errorHandler}
			/>
			{isLoading && (
				<div className='center'>
					<LoadingSpinner asOverlay />
				</div>
			)}
			{!isLoading && userPlaces && (
				<PlacesList
					onDelete={onDeletePlaceHandler}
					placeItems={userPlaces}
				/>
			)}
			{!userPlaces && <NoDataDisplay />}
		</>
	);
};

export default Places;
