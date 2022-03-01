import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.styles.scss';
import Header from '../header/Header.component';
import NavigationLinks from '../navigation-links/NavigationLinks.component';
const Navigation = () => {
	return (
		<Header>
			<button className='main-navigation__menu-btn'>
				<span/>
				<span/>
				<span/>
			</button>
			<h1 className='main-navigation__title'>
				<Link to='/'>Impressify</Link>
			</h1>
			<nav><NavigationLinks/></nav>
		</Header>
	);
};

export default Navigation;
