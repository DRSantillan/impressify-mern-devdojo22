import React, { useState } from 'react';
import './Authentication.styles.scss';
import AuthenticationForm from '../../components/auth/form/AuthenticationForm.component';
import Button from '../../components/ui/button/Button.component';
import Card from '../../components/ui/card/Card.component';

const Authentication = () => {
	const [isNewUser, setIsNewUser] = useState(false);

	const switchFormHandler = () => {
		setIsNewUser(prevState => !prevState);
	};
	return (
		<Card className='authentication'>
			<h2>{isNewUser ? 'Register New Account' : 'Login Required'}</h2>
			<hr />
			<AuthenticationForm newUser={isNewUser} />

			<Button inverse onClick={switchFormHandler}>
				{!isNewUser ? 'Register New Account' : 'Login'}
			</Button>
		</Card>
	);
};

export default Authentication;
