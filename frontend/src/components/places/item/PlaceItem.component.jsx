import { useState, useEffect } from 'react';
import './PlaceItem.styles.scss';
import Card from '../../ui/card/Card.component';
import Button from '../../ui/button/Button.component';
import Modal from '../../ui/modal/Modal.component';
import GoogleMap from '../../ui/google-map/GoogleMap.component';

const PlaceItem = ({
	id,
	imageUrl,
	title,
	address,
	description,
	creatorId,
	location,
}) => {
	console.log(location);
	const [showMap, setShowMap] = useState(false);

	const openGoogleMapHandler = () => setShowMap(true);
	const closeGoogleMapHandler = () => setShowMap(false);

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
						<Button to={`/places/${id}`}>Edit</Button>
						<Button danger>Delete</Button>
					</div>
				</Card>
			</li>
		</>
	);
};

export default PlaceItem;
