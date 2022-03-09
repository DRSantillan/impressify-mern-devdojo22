import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthenticationContext } from '../../../../context/auth/AuthenticationContext.context';
import './NavigationLinks.styles.scss';

const NavigationLinks = () => {
	const {userId, logoutUser, isLoggedIn} = useContext(AuthenticationContext);
	return (
		<ul className='nav-links'>
			<li>
				<NavLink to='/' exact='true'>
					All Users
				</NavLink>
			</li>
			{isLoggedIn && <><li>
				<NavLink to={`/${userId}/places`}>My Places</NavLink>
			</li>
			<li>
				<NavLink to='/places/new'>Add New Place</NavLink>
			</li></>}
			{!isLoggedIn ? <li>
				<NavLink to='/authenticate'>Sign In</NavLink>
			</li>: <li><NavLink to='/authenticate' onClick={logoutUser}>Log Out</NavLink></li>}
			
		</ul>
	);
};

export default NavigationLinks;
