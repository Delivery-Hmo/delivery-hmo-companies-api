import tf, { Tensor3D } from "@tensorflow/tfjs-node";
import nsfw from "nsfwjs";
import { handleErrorFunction } from "./handleError";

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

export const checkSecureImage = async (base64: string) => {
	try {
		if (!base64) throw "No se ha encontrado la imagen.";

		const content = Buffer.from(base64, "base64");
		const image = tf.node.decodeImage(content, 3) as Tensor3D;

		const model = await nsfw.load();
		const predictions = await model.classify(image);

		image.dispose();

		const isSecure = !predictions.some(p => ["Hentai", "Porn", "Sexy"].includes(p.className) && p.probability >= 0.5);

		if(!isSecure) throw "La imagen no es segura.";
	} catch (error) {
		handleErrorFunction(error, "Error al verificar la imagen.");	
	}
}

export const getExtensionByContentType = (contentType: string) => {
	const extension = contentType.split("/")[1];

	if(extension === "jpeg") return "jpg";

	return extension;
}