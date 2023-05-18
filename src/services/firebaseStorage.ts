import { Application, Request } from "express";
import { checkSecureImage, getExtensionByContentType } from "../utils/functions";
import { baseUrlStorage } from "../constants";
import admin from "firebase-admin";
import { storageBucket } from "../configServer";
import { NameModels } from "../types";
import allModels from "../models/allModels";
import handleError from "../utils/handleError";

const upload = async (fileString: string, req: Request) => {
	try {
		const fileBase64 = fileString.split(",")[1];
		const contentType = fileString.split(";")[0].split(":")[1];
		const routeController = req.originalUrl.replace("/", "").split("/")[0];

		const path = `images/${routeController}/${new Date().getTime()}.${getExtensionByContentType(contentType)}`;
		const content = Buffer.from(fileBase64, "base64");
		const file = admin.storage().bucket(storageBucket).file(path);

		await file.save(content);

		const [url] = await file.getSignedUrl({ action: "read", expires: "01-01-2045" });

		return url;
	} catch (error) {
		console.log(error);
		return "";
	}
}

export const uploadFiles = (app: Application) => {
	app.use(async (req, res, next) => {
		try {
			if (!["POST", "PUT"].includes(req.method) || !req.body || !Object.keys(req.body).some(key => ["image", "images"].includes(key))) {
				return next();
			}
	
			const { image, id } = req.body as { image: string, images: string[], id?: string };
	
			if (image && !image.includes(baseUrlStorage)) {
				const imageBase64 = image.split(",")[1];
				const isSecure = await checkSecureImage(imageBase64);
	
				if (!isSecure) {
					return res.status(500).json("Error de revisión o imagen inapropiada.");
				}
	
				const url = await upload(image, req);
	
				if (!url) {
					return res.status(500).json("Error al subir la imagen.");
				}
	
				if (id) {
					const routeController = req.originalUrl.replace("/", "").split("/")[0];
					const nameModel = routeController.charAt(0).toUpperCase() + routeController.slice(1);
					const model = allModels[nameModel as NameModels];
	
					const modelDoc = await model.findById(id);
	
					if (modelDoc && !modelDoc.image.includes(baseUrlStorage)) {
						const fileName = modelDoc.image.split('https://storage.googleapis.com/delivery-hmo.appspot.com/')[1].split('?')[0];
	
						await admin.storage().bucket().file(fileName).delete();
					}
				}
	
				req.body.image = url;
			}
	
			return next();
		} catch (error) {
			return handleError(res, error);
		}
	});
} 