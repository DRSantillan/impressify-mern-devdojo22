import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthenticationContext } from '../../../../context/auth/AuthenticationContext.context';
import Button from '../../button/Button.component';
import './NavigationLinks.styles.scss';

const NavigationLinks = () => {
	const auth = useContext(AuthenticationContext);
	return (
		<ul className='nav-links'>
			<li>
				<NavLink to='/' exact='true'>
					All Users
				</NavLink>
			</li>
			{auth.isLoggedIn && <><li>
				<NavLink to='/39883dkj/places'>My Places</NavLink>
			</li>
			<li>
				<NavLink to='/places/new'>Add New Place</NavLink>
			</li></>}
			{!auth.isLoggedIn ? <li>
				<NavLink to='/authenticate'>Sign In</NavLink>
			</li>: <li><NavLink to='/authenticate' onClick={auth.logoutUser}>Log Out</NavLink></li>}
			
		</ul>
	);
};

export default NavigationLinks;
