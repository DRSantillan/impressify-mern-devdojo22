import React from 'react';
import ReactDom from 'react-dom';
import './BackDrop.styles.scss';
const BackDrop = ({ closeSideDrawer }) => {
	const backDropContent = (
		<div className='backdrop' onClick={closeSideDrawer}></div>
	);
	return ReactDom.createPortal(
		backDropContent,
		document.getElementById('backdrop')
	);
};

export default BackDrop;
