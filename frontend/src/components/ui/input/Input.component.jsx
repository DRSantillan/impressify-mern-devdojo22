import { useReducer, useEffect } from 'react';
import { validate } from '../../../util/validator.utility';
import './Input.styles.scss';

const inputReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
			console.log(state)
			return {
				...state,
				value: action.val,
				isValid: validate(action.val, action.validators),
			};
		case 'TOUCH':
			return {
				...state,
				isTouched: true,
			};
		default:
			return state;
	}
};

const Input = ({
	id,
	type,
	placeholder,
	label,
	rows,
	element,
	errorText,
	validators,
    onInput,
	initialValid,
	initialValue,
	
}) => {
	
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: initialValue || '',
		isTouched: false,
		isValid: initialValid || false,
	});
    const {value, isValid} = inputState
	
	//
	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, onInput, value, isValid]);
	//
	const changeHandler = event => {
		dispatch({ type: 'CHANGE', val: event.target.value, validators });
	};
	//
	const touchHandler = () => {
		dispatch({ type: 'TOUCH' });
	};
	//
	const formElement =
		element === 'input' ? (
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
			/>
		) : (
			<textarea
				id={id}
				rows={rows || 3}
				onChange={changeHandler}
				onBlur={touchHandler}
				value={inputState.value}
			/>
		);
	//
	return (
		<div
			className={`form-control ${
				!inputState.isValid &&
				inputState.isTouched &&
				'form-control--invalid'
			}`}
		>
			<label htmlFor={id}>{label}</label>
			{formElement}
			{!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
		</div>
	);
};

export default Input;
