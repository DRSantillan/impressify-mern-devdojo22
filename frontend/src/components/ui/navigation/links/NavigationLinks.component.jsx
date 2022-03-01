import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationLinks.styles.scss';

const NavigationLinks = () => {
	return (
		<ul className='nav-links'>
			<li>
				<NavLink to='/' exact>
					All Users
				</NavLink>
			</li>
			<li>
				<NavLink to='/39883dkj/places'>My Places</NavLink>
			</li>
			<li>
				<NavLink to='/places/new'>Add New Place</NavLink>
			</li>
			<li>
				<NavLink to='/authenticate'>Sign In</NavLink>
			</li>
		</ul>
	);
};

export default NavigationLinks;
