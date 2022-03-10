import React, { useState } from 'react';
import './Authentication.styles.scss';
import AuthenticationForm from '../../components/auth/form/AuthenticationForm.component';
import Button from '../../components/ui/button/Button.component';
import Card from '../../components/ui/card/Card.component';
import useForm from '../../hooks/useForm.hook';

const Authentication = () => {
	const [isNewUser, setIsNewUser] = useState(false);
	const [formState, inputHandler, setFormData] = useForm(
		{
			email: { value: '', isValid: false },
			password: { value: '', isValid: false },
		},
		false
	);

	const switchFormHandler = () => {
		if (isNewUser) {
			setFormData(
				{
					...formState.inputs,
					name: { value: '', isValid: false },
					imageUrl: { value: '', isValid: false },
				},
				
			);
		
		} else {
			setFormData(
				{
					...formState.inputs,
					name: undefined,
					imageUrl: undefined,
				},
				formState.inputs.email.isValid &&
					formState.inputs.password.isValid
			);
		}
		setIsNewUser(prevState => !prevState);
	};
	return (
		<Card className='authentication'>
			<h2>{isNewUser ? 'Register New Account' : 'Login Required'}</h2>
			<hr />
			<AuthenticationForm
				newUser={isNewUser}
				formState={formState}
				inputHandler={inputHandler}
			/>

			<Button inverse onClick={switchFormHandler}>
				{!isNewUser ? 'Register New Account' : 'Login'}
			</Button>
		</Card>
	);
};

export default Authentication;
