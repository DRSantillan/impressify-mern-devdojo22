import { useCallback, useReducer } from 'react';
import Input from '../../../components/ui/input/Input.component';
import {
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../../../util/validator.utility';
import Button from '../../../components/ui/button/Button.component';
import './NewPlace.styles.scss';

const formReducer = (state, action) => {
	switch (action.type) {
		case 'INPUT_CHANGE':
			let formIsValid = true;
			for (const inputId in state.inputs) {
				if (inputId === action.inputId) {
					formIsValid = formIsValid && action.isValid;
				} else {
					formIsValid = formIsValid && state.inputs[inputId].isValid;
				}
			}
			return {
				...state,
				inputs: {
					...state.inputs,
					[action.inputId]: {
						value: action.value,
						isValid: action.isValid,
					},
				},
				isValid: formIsValid,
			};
		default:
			return state;
	}
};
const NewPlace = () => {
	//
	const [formState, dispatch] = useReducer(formReducer, {
		inputs: {
			title: { value: '', isValid: false },
			description: { value: '', isValid: false },
		},
		isValid: false,
	});
	//
	const inputHandler = useCallback((id, value, isValid) => {
		dispatch({ type: 'INPUT_CHANGE', value, isValid, inputId: id });
	}, []);
	//
	const formSubmitHandler = event => {
		event.preventDefault();
		console.log(formState.inputs);
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
