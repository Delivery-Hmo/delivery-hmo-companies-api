import { Response } from "express";
import { FirebaseError } from "firebase-admin";
import tf, { Tensor3D } from "@tensorflow/tfjs-node";
import nsfw from "nsfwjs";
import axios from "axios";

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

export const unauthorized = (res: Response) => res.status(401).json({ message: 'Unauthorized' });

export function isFirebaseError(error: FirebaseError): error is FirebaseError {
  return error.code !== undefined;
}

export const imagePrediction = async (content?: Uint8Array) => {
	const pic = await axios.get(`https://firebasestorage.googleapis.com/v0/b/delivery-hmo.appspot.com/o/imagenesPerfil%2Fperfil.jpg?alt=media&token=a07f8154-7aaa-4397-a8cf-4aeaee5b0f5e`, {
    responseType: 'arraybuffer',
  })

	const model = await nsfw.load() // To load a local model, nsfw.load('file://./path/to/model/')
  // Image must be in tf.tensor3d format
  // you can convert image to tf.tensor3d with tf.node.decodeImage(Uint8Array,channels)
  const image = tf.node.decodeImage(pic.data, 3) as Tensor3D;
  const predictions = await model.classify(image);
  image.dispose() // Tensor memory must be managed explicitly (it is not sufficient to let a tf.Tensor go out of scope for its memory to be released).
  console.log(predictions)
}