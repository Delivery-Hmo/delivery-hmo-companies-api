const earthRadius = 6371000;

export const isPointInsideCircle = (pointLat: number, pointLng: number, circleLat: number, circleLng: number, circleRadius: number) => {
	const pointLatRad = pointLat * Math.PI / 180;
	const pointLngRad = pointLng * Math.PI / 180;
	const circleLatRad = circleLat * Math.PI / 180;
	const circleLngRad = circleLng * Math.PI / 180;
	const distance = earthRadius * Math.acos(
		Math.sin(circleLatRad) * Math.sin(pointLatRad) +
		Math.cos(circleLatRad) * Math.cos(pointLatRad) *
		Math.cos(pointLngRad - circleLngRad)
	);

	return distance <= circleRadius;
}
