import React from 'react';

import { Link } from 'react-router-dom';

import './Button.styles.scss';

const Button = ({
	to,
	exact,
	href,
	size,
	type,
	disabled,
	onClick,
	inverse,
	danger,
	children,
}) => {
	const classes = `button button--${size || 'default'} ${
		inverse && 'button--inverse'
	} ${danger && 'button--danger'}`;
	if (href) {
		return (
			<a className={classes} href={href}>
				{children}
			</a>
		);
	}
	if (to) {
		return (
			<Link to={to} exact={exact} className={classes}>
				{children}
			</Link>
		);
	}

	return (
		<button
			className={classes}
			type={type}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

export default Button;
