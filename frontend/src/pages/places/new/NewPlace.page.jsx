import { useCallback, useReducer } from 'react';
import Input from '../../../components/ui/input/Input.component';
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../../../util/validator.utility';
import Button from '../../../components/ui/button/Button.component';
import './NewPlace.styles.scss';
import useForm from '../../../hooks/useForm.hook';

const NewPlace = () => {
	const [formState, inputHandler] = useForm(
		{
			title: { value: '', isValid: false },
			description: { value: '', isValid: false },
			address: { value: '', isValid: false },
		},
		false
	);

	//
	const formSubmitHandler = event => {
		event.preventDefault();
		
	};
	//
	return (
		<form className='place-form' onSubmit={formSubmitHandler}>
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
	);
};

export default NewPlace;
