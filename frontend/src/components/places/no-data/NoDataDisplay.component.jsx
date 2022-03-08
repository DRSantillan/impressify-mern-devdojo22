import React from 'react';
import Button from '../../ui/button/Button.component';
import Card from '../../ui/card/Card.component';

const NoDataDisplay = () => {
	return (
		<div className='place-list center'>
			<Card>
				<h2>
					No places were found!
					<br />
					<br />
					<Button to='/places/new'>Share Place</Button>
				</h2>
			</Card>
		</div>
	);
};

export default NoDataDisplay;
