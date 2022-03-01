import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.styles.scss';
import Header from '../header/Header.component';
import NavigationLinks from '../navigation-links/NavigationLinks.component';
import SideDrawer from '../side-drawer/SideDrawer.component';
import BackDrop from '../backdrop/BackDrop.component';
const Navigation = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const openSideDrawerHandler = () => {
		setIsDrawerOpen(true);
	};
	const closeSideDrawerHandler = () => {
		setIsDrawerOpen(false);
	};
	return (
		<>
			{isDrawerOpen ? (
				<BackDrop closeSideDrawer={closeSideDrawerHandler} />
			) : null}

			<SideDrawer show={isDrawerOpen} onClick={closeSideDrawerHandler}>
				<nav className='main-navigation__drawer-nav'>
					<NavigationLinks />
				</nav>
			</SideDrawer>

			<Header>
				<button
					className='main-navigation__menu-btn'
					onClick={openSideDrawerHandler}
				>
					<span />
					<span />
					<span />
				</button>
				<h1 className='main-navigation__title'>
					<Link to='/'>Impressify</Link>
				</h1>
				<nav className='main-navigation__header-nav'>
					<NavigationLinks />
				</nav>
			</Header>
		</>
	);
};

export default Navigation;
