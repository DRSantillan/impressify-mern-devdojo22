import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { USER_PLACES_DATA } from '../../../data/db';
import Button from '../../../components/ui/button/Button.component';
import Card from '../../../components/ui/card/Card.component';
import Input from '../../../components/ui/input/Input.component';
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../../../util/validator.utility';
import useForm from '../../../hooks/useForm.hook';
import '../new/NewPlace.styles.scss';
const UpdatePlace = () => {
	const [isLoading, setIsLoading] = useState(true);
	const placeId = useParams().placeId;
	const [formState, inputHandler, setFormData] = useForm(
		{
			title: { value: '', isValid: false },
			description: { value: '', isValid: false },
		},
		false
	);
	const placeToUpdate = USER_PLACES_DATA.find(pid => pid.id === placeId);
	const { title, description } = placeToUpdate;
	//
	useEffect(() => {
		if (title) {
			setFormData(
				{
					title: { value: title, isValid: true },
					description: { value: description, isValid: true },
				},
				true
			);
		}
		setIsLoading(false);
	}, [title, description, setFormData]);
	//
	if (!placeToUpdate) {
		return (
			
				<div className='center'><Card>
					<h2>Could not find place you requested!</h2>
				</Card></div>
			
		);
	}
	//
	if (isLoading) {
		return (
			<div className='center'>
				<h2>Loading.....</h2>
			</div>
		);
	}
	//
	const updatePlaceHandler = event => {
		event.preventDefault();
		// leaving this empty ready for rest api implementation
		// leaving this empty ready for rest api implementation
		console.log(formState.inputs);
	};
	//
	return (
		formState.inputs.title.value && (
			<form className='place-form' onSubmit={updatePlaceHandler}>
				<Input
					id='title'
					element='input'
					label='Title:'
					type='text'
					validators={[VALIDATOR_REQUIRE()]}
					errorText='Please enter a valid title.'
					onInput={inputHandler}
					initialValue={formState.inputs.title.value}
					initialValid={formState.inputs.title.isValid}
				/>
				<Input
					id='description'
					element='textarea'
					label='Description:'
					validators={[VALIDATOR_MINLENGTH(5)]}
					errorText='Please enter a valid description (5 characters or more.).'
					onInput={inputHandler}
					initialValue={formState.inputs.description.value}
					initialValid={formState.inputs.description.isValid}
				/>
				<Button type='submit' disabled={!formState.isValid}>
					Update Place
				</Button>
			</form>
		)
	);
};

export default UpdatePlace;
