import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './SideDrawer.styles.scss';
const SideDrawer = ({ children, show, onClick }) => {
	const sideDrawerContent = (
		<CSSTransition
			in={show}
			timeout={5000}
			classNames='slide-in-left'
			mountOnEnter
			unmountOnExit
		>
			<aside className='side-drawer' onClick={onClick}>
				{children}
			</aside>
		</CSSTransition>
	);

	return ReactDOM.createPortal(
		sideDrawerContent,
		document.getElementById('drawer')
	);
};

export default SideDrawer;
