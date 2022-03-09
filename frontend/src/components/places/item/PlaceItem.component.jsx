import { useState, useContext } from 'react';
import './PlaceItem.styles.scss';
import Card from '../../ui/card/Card.component';
import Button from '../../ui/button/Button.component';
import Modal from '../../ui/modal/Modal.component';
import GoogleMap from '../../ui/google-map/GoogleMap.component';
import useHttpClient from '../../../hooks/http/useHttpClient.hook';
import { DELETE_USER_PLACE_URL } from '../../../config/api.urls.config';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '../../ui/modal/error/ErrorModal.component';

import { AuthenticationContext } from '../../../context/auth/AuthenticationContext.context';
import LoadingSpinner from '../../ui/spinner/LoadingSpinner.component';

const PlaceItem = ({
	id,
	imageUrl,
	title,
	address,
	description,
	creatorId,
	location,
	onDelete,
}) => {
	const auth = useContext(AuthenticationContext);
	const { isLoading, errorHandler, httpRequest, errorMessage } =
		useHttpClient();
	const [showMap, setShowMap] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const navigate = useNavigate();
	// handlers
	const openGoogleMapHandler = () => setShowMap(true);
	const closeGoogleMapHandler = () => setShowMap(false);
	const openConfirmationHandler = () => setShowConfirmation(true);
	const closeConfirmationHandler = () => setShowConfirmation(false);
	const deletePlaceHandler = async () => {
		setShowConfirmation(false);
		try {
			await httpRequest(`${DELETE_USER_PLACE_URL}${id}`, 'DELETE');
			onDelete(id);
		} catch (error) {}

		navigate(`/${auth.userId}/places`);
	};
	//
	return (
		<>
			<ErrorModal
				error={errorMessage}
				show={errorMessage}
				onClear={errorHandler}
			/>
			<Modal
				show={showMap}
				onCancel={closeGoogleMapHandler}
				header={address}
				contentClass='place-item__modal-content'
				footerClass='place-item__modal-actions'
				footer={<Button onClick={closeGoogleMapHandler}>Close</Button>}
			>
				<div className='map-container'>
					<GoogleMap center={location} zoom={16} />
				</div>
			</Modal>
			<Modal
				show={showConfirmation}
				header='Are you sure you want to delete this Place?'
				footer={
					<>
						<Button onClick={closeConfirmationHandler} inverse>
							Cancel
						</Button>
						<Button onClick={deletePlaceHandler} danger>
							Delete
						</Button>
					</>
				}
				onCancel={closeConfirmationHandler}
				footerClass='place-item__modal-actions'
			>
				<p>Please confirm deletion, this action cannot be undone?</p>
			</Modal>
			<li className='place-item'>
				<Card className='place-item__content'>
					{isLoading && <LoadingSpinner asOverlay/>}
					<div className='place-item__image'>
						<img src={imageUrl} alt={title} />
					</div>
					<div className='place-item__info'>
						<h2>{title}</h2>
						<h3>{address}</h3>
						<p>{description}</p>
					</div>
					<div className='place-item__actions'>
						<Button inverse onClick={openGoogleMapHandler}>
							View On Map
						</Button>
						{auth.isLoggedIn && (
							<>
								<Button to={`/places/${id}`}>Edit</Button>
								<Button
									danger
									onClick={openConfirmationHandler}
								>
									Delete
								</Button>
							</>
						)}
					</div>
				</Card>
			</li>
		</>
	);
};

export default PlaceItem;
