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
import ImageUploader from '../../ui/image-uploader/ImageUploader.component';

const AuthenticationForm = ({ newUser }) => {
	const { loginUser } = useContext(AuthenticationContext);
	const [formState, inputHandler, setFormData] = useForm(
		{
			email: { value: '', isValid: false },
			password: { value: '', isValid: false },
			// name: {value: '', isValid: false},
			// imageUrl: {value: '', isValid: false}
		},
		false
	);

	const { name, email, password, imageUrl } = formState.inputs;

	const { errorHandler, errorMessage, isLoading, httpRequest } =
		useHttpClient();
	const userSignInHandler = async event => {
		event.preventDefault();

		//
		if (newUser) {
			try {
				const formData = new FormData();
				formData.append('name', name.value);
				formData.append('email', email.value);
				formData.append('password', password.value);
				formData.append('imageUrl', imageUrl.value);
				const data = await httpRequest(
					REGISTER_NEW_USER_URL,
					'POST',
					formData
				);
				//
				loginUser(data.user.id, data.token);
			} catch (error) {}
		} else {
			try {
				//
				const data = await httpRequest(
					AUTHENTICATE_USER_URL,
					'POST',
					JSON.stringify({
						email: email.value,
						password: password.value,
					}),
					{ 'Content-Type': 'application/json' }
				);
				//
				loginUser(data.user.id, data.token);
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
					<>
						<Input
							id='name'
							type='text'
							element='input'
							label='Name:'
							onInput={inputHandler}
							validators={[VALIDATOR_REQUIRE()]}
							errorText='Please enter a valid name.'
						/>

						<ImageUploader
							id='imageUrl'
							onInput={inputHandler}
							center
							setFormData={setFormData}
							formState={formState}
							errorText='Please choose an image!'
						/>
					</>
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
					validators={[VALIDATOR_MINLENGTH(6)]}
					errorText='Please enter a valid password, at least 6 characters.'
				/>

				<Button type='submit' disabled={!formState.isValid}>
					{newUser ? 'Register New Account' : 'Login'}
				</Button>
			</form>
		</>
	);
};

export default AuthenticationForm;
