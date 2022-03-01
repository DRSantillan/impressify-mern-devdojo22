import React from 'react';
import css from './Avatar.styles.module.scss';

const Avatar = ({ className, style, imageUrl, alt, width }) => {
	return (
		<div className={`${css.avatar} ${className}`} style={style}>
			<img
				src={imageUrl}
				alt={alt}
				width={width}
				height={width}
				//style={{ width: width, height: width }}
			/>
		</div>
	);
};

export default Avatar;
