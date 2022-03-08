import { useState, useContext } from 'react';
import './PlaceItem.styles.scss';
import Card from '../../ui/card/Card.component';
import Button from '../../ui/button/Button.component';
import Modal from '../../ui/modal/Modal.component';
import GoogleMap from '../../ui/google-map/GoogleMap.component';
import {AuthenticationContext} from '../../../context/auth/AuthenticationContext.context'

const PlaceItem = ({
	id,
	imageUrl,
	title,
	address,
	description,
	creatorId,
	location,
}) => {
	const auth = useContext(AuthenticationContext);
	const [showMap, setShowMap] = useState(false);
	const [showConfirmation, setShowConfirmation] = useState(false);
	// handlers
	const openGoogleMapHandler = () => setShowMap(true);
	const closeGoogleMapHandler = () => setShowMap(false);
	const openConfirmationHandler = () => setShowConfirmation(true);
	const closeConfirmationHandler = () => setShowConfirmation(false);
	const deletePlaceHandler = id => setShowConfirmation(false);;
	//
	return (
		<>
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
						<Button onClick={() => deletePlaceHandler(id)} danger>
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
						{auth.isLoggedIn && <>
						<Button to={`/places/${id}`}>Edit</Button>
						<Button danger onClick={openConfirmationHandler}>
							Delete
						</Button>
						</>}
						
					</div>
				</Card>
			</li>
		</>
	);
};

export default PlaceItem;
