import React from 'react';
import './Header.styles.scss';

const Header = ({children}) => {
	return <header className='main-header'>{children}</header>;
};

export default Header;
