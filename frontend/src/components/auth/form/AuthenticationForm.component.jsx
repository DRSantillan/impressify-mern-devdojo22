import { useContext, useState } from 'react';
import Input from '../../ui/input/Input.component';
import Button from '../../ui/button/Button.component';
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../../../util/validator.utility';
import {
	REGISTER_NEW_USER_URL,
	AUTHENTICATE_USER_URL,
} from '../../../config/api.urls.config.js';
import useForm from '../../../hooks/useForm.hook';
import { AuthenticationContext } from '../../../context/auth/AuthenticationContext.context';
import ErrorModal from '../../ui/modal/error/ErrorModal.component';
import LoadingSpinner from '../../ui/spinner/LoadingSpinner.component';
import useHttpClient from '../../../hooks/http/useHttpClient.hook';
import '../../../pages/places/new/NewPlace.styles.scss';

const AuthenticationForm = ({ newUser }) => {
	const auth = useContext(AuthenticationContext);
	const [formState, inputHandler, setFormData] = useForm({}, false);
	//const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const { name, email, password } = formState.inputs;

	const { errorHandler, errorMessage, isLoading, httpRequest } =
		useHttpClient();
	const userSignInHandler = async event => {
		event.preventDefault();
		//
		if (newUser) {
			try {
				//
				await httpRequest(
					REGISTER_NEW_USER_URL,
					'POST',
					JSON.stringify({
						name: name.value,
						email: email.value,
						password: password.value,
					}),
					{ 'Content-Type': 'application/json' }
				);
				//
				auth.loginUser();
			} catch (error) {}
		} else {
			try {
				//
				await httpRequest(
					AUTHENTICATE_USER_URL,
					'POST',
					JSON.stringify({
						email: email.value,
						password: password.value,
					}),
					{ 'Content-Type': 'application/json' }
				);
				//
				auth.loginUser();
			} catch (error) {}
		}
	};

	return (
		<>
			<ErrorModal
				error={errorMessage}
				show={errorMessage}
				onClear={errorHandler}
			/>
			<form onSubmit={userSignInHandler}>
				{isLoading && <LoadingSpinner asOverlay />}
				{newUser && (
					<Input
						id='name'
						type='text'
						element='input'
						label='Name:'
						onInput={inputHandler}
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid name.'
					/>
				)}
				<Input
					id='email'
					type='email'
					element='input'
					label='Email Address:'
					onInput={inputHandler}
					validators={[VALIDATOR_EMAIL()]}
					errorText='Please enter a valid email.'
				/>
				<Input
					id='password'
					type='password'
					element='input'
					label='Password:'
					onInput={inputHandler}
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText='Please enter a valid password, at least 5 characters.'
				/>
				<Button type='submit' disabled={!formState.isValid}>
					{newUser ? 'Register New Account' : 'Login'}
				</Button>
			</form>
		</>
	);
};

export default AuthenticationForm;
