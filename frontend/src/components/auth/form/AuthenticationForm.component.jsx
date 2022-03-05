import { useContext } from 'react';
import Input from '../../ui/input/Input.component';
import Button from '../../ui/button/Button.component';
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
} from '../../../util/validator.utility';
import useForm from '../../../hooks/useForm.hook';
import { AuthenticationContext } from '../../../context/auth/AuthenticationContext.context';
import '../../../pages/places/new/NewPlace.styles.scss';

const AuthenticationForm = ({ newUser }) => {
    const auth = useContext(AuthenticationContext)
	const [formState, inputHandler, setFormData] = useForm({}, false);

	const userSignInHandler = event => {
		event.preventDefault();
		console.log(formState.inputs);
        auth.loginUser()
	};
	return (
		<form onSubmit={userSignInHandler}>
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
	);
};

export default AuthenticationForm;
