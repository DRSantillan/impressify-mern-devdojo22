import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/button/Button.component';
import Input from '../../../components/ui/input/Input.component';
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../../../util/validator.utility';
import { UPDATE_USER_PLACE_URL } from '../../../config/api.urls.config';
import LoadingSpinner from '../../../components/ui/spinner/LoadingSpinner.component';
import ErrorModal from '../../../components/ui/modal/error/ErrorModal.component';
import { AuthenticationContext } from '../../../context/auth/AuthenticationContext.context';
import useHttpClient from '../../../hooks/http/useHttpClient.hook';
import { GET_PLACE_BY_ID_URL } from '../../../config/api.urls.config';
import useForm from '../../../hooks/useForm.hook';
import '../new/NewPlace.styles.scss';

const UpdatePlace = () => {
	const navigate = useNavigate();
	const { userId, token } = useContext(AuthenticationContext);
	const { isLoading, errorHandler, errorMessage, httpRequest } =
		useHttpClient();
	const [loadedPlace, setLoadedPlace] = useState();
	const placeId = useParams().placeId;

	const [formState, inputHandler, setFormData] = useForm(
		{
			title: { value: '', isValid: false },
			description: { value: '', isValid: false },
		},
		false
	);

	useEffect(() => {
		//
		const getUserPlaceByID = async () => {
			//
			try {
				const data = await httpRequest(
					`${GET_PLACE_BY_ID_URL}${placeId}`
				);
				setLoadedPlace(data.place);
				setFormData({
					title: { value: data.place.title, isValid: true },
					description: {
						value: data.place.description,
						isValid: true,
					},
				});
			} catch (error) {}
		};
		getUserPlaceByID();
	}, [httpRequest, placeId, setFormData]);

	//
	const updatePlaceHandler = async event => {
		event.preventDefault();
		//
		const { title, description } = formState.inputs;
		//
		try {
			await httpRequest(
				`${UPDATE_USER_PLACE_URL}${placeId}`,
				'PUT',
				JSON.stringify({
					title: title.value,
					description: description.value,
				}),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				}
			);
		} catch (error) {}
		//
		navigate(`/${userId}/places`);
	};
	//
	return (
		<>
			<ErrorModal
				error={errorMessage}
				show={errorMessage}
				onClear={errorHandler}
			/>
			{isLoading && <LoadingSpinner asOverlay />}
			{!isLoading && loadedPlace && (
				<form className='place-form' onSubmit={updatePlaceHandler}>
					<Input
						id='title'
						element='input'
						label='Title:'
						type='text'
						validators={[VALIDATOR_REQUIRE()]}
						errorText='Please enter a valid title.'
						onInput={inputHandler}
						initialValue={loadedPlace.title}
						initialValid={true}
					/>
					<Input
						id='description'
						element='textarea'
						label='Description:'
						validators={[VALIDATOR_MINLENGTH(5)]}
						errorText='Please enter a valid description (5 characters or more.).'
						onInput={inputHandler}
						initialValue={loadedPlace.description}
						initialValid={true}
					/>
					<Button type='submit' disabled={!formState.isValid}>
						Update Place
					</Button>
				</form>
			)}
		</>
	);
};

export default UpdatePlace;
