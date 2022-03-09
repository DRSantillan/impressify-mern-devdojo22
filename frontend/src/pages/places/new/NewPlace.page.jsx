import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/input/Input.component';
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../../../util/validator.utility';
import Button from '../../../components/ui/button/Button.component';
import './NewPlace.styles.scss';
import useForm from '../../../hooks/useForm.hook';
import useHttpClient from '../../../hooks/http/useHttpClient.hook';
import ErrorModal from '../../../components/ui/modal/error/ErrorModal.component';
import LoadingSpinner from '../../../components/ui/spinner/LoadingSpinner.component';
import { CREATE_NEW_USER_PLACE_URL } from '../../../config/api.urls.config';
import { AuthenticationContext } from '../../../context/auth/AuthenticationContext.context';

const NewPlace = () => {
	const { userId } = useContext(AuthenticationContext);
	const navigate = useNavigate();
	const { isLoading, errorMessage, errorHandler, httpRequest } =
		useHttpClient();
	const [formState, inputHandler] = useForm(
		{
			title: { value: '', isValid: false },
			description: { value: '', isValid: false },
			address: { value: '', isValid: false },
		},
		false
	);
	//
	const formSubmitHandler = async event => {
		event.preventDefault();
		const { title, description, address } = formState.inputs;
		try {
			await httpRequest(
				CREATE_NEW_USER_PLACE_URL,
				'POST',
				JSON.stringify({
					title: title.value,
					description: description.value,
					imageUrl:
						'https://www.japanrailpass.com.au/wp-content/uploads/2016/09/Tokyo-Tower.jpg',
					address: address.value,
					creator: userId,
				}),
				{ 'Content-Type': 'application/json' }
			);
			navigate(`/${userId}/places`);
		} catch (error) {}
	};
	//
	return (
		<>
			<ErrorModal
				error={errorMessage}
				show={errorMessage}
				onClear={errorHandler}
			/>
			<form className='place-form' onSubmit={formSubmitHandler}>
				{isLoading && <LoadingSpinner asOverlay />}
				<Input
					id='title'
					type='text'
					element='input'
					label='Title'
					onInput={inputHandler}
					validators={[VALIDATOR_REQUIRE()]}
					errorText='Please enter a valid title.'
				/>
				<Input
					id='address'
					element='input'
					label='Address'
					onInput={inputHandler}
					validators={[VALIDATOR_REQUIRE()]}
					errorText='Please enter a valid address.'
				/>
				<Input
					id='description'
					element='textarea'
					rows='5'
					label='Description'
					onInput={inputHandler}
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText='Please enter a valid description (at least 5 characters).'
				/>
				<Button type='submit' disabled={!formState.isValid}>
					Add New Place
				</Button>
			</form>
		</>
	);
};

export default NewPlace;
