import React from 'react';
import css from './Card.styles.module.scss';
const Card = ({ className, style, children }) => {
	return (
		<div className={`${css.card} ${className}`} style={style}>
			{children}
		</div>
	);
};

export default Card;
