import React, { useRef, useEffect } from 'react';
import './GoogleMap.styles.scss';

const GoogleMap = ({ className, style, center, zoom }) => {
	const mapRef = useRef();

	useEffect(() => {
		const googleMap = new window.google.maps.Map(mapRef.current, {
			center: center,
			zoom: zoom,
		});
		new window.google.maps.Marker({ position: center, map: googleMap });
	}, [center, zoom]);
	return (
		<div ref={mapRef} className={`map ${className}`} style={style}>
			
		</div>
	);
};

export default GoogleMap;
