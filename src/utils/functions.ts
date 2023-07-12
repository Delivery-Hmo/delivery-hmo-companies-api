import tf, { Tensor3D } from "@tensorflow/tfjs-node";
import nsfw from "nsfwjs";
import { handleErrorFunction } from "./handleError";
import sharp from "sharp";

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
		const predictions = await model.classify(image as any);

		image.dispose();

		const isSecure = !predictions.some(p => ["Hentai", "Porn", "Sexy"].includes(p.className) && p.probability >= 0.5);

		if (!isSecure) throw "La imagen o las imagenes no son seguras.";
	} catch (error) {
		throw handleErrorFunction(error);
	}
}

export const getExtensionByContentType = (contentType: string) => {
	const extension = contentType.split("/")[1];

	if (extension === "jpeg") return "jpg";

	return extension;
}

export const compreesImage = async (buffer: Buffer) => {
	try {
		let { width, height } = await sharp(buffer).metadata();
		width = width || 0;
		height = height || 0;

		const cropWidth = 320;
		const cropHeight = 240;

		if(width > cropWidth || height > cropHeight) {
		  return await sharp(buffer).resize(320, 240).jpeg().toBuffer();
		}

		return await sharp(buffer).jpeg().toBuffer();
	} catch (error) {
		throw handleErrorFunction(error);
	}
}

export const fileToBuffer = async (blob: Blob) => {
	try {
		const arrayBuffer = await blob.arrayBuffer();

		return Buffer.from(arrayBuffer);
	} catch (error) {
		throw handleErrorFunction(error);
	}
}