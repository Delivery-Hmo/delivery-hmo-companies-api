import handleError from "../utils/handleError";
import { Application } from "express";
import { baseUrlStorage, baseUrlStorageGoogle } from "../constants";
import { uploadImageBase64ToStorage } from "../services/firebaseStorage";

const uploadFiles = (app: Application) => {
	app.use(async (req, res, next) => {
		try {
			if (!["POST", "PUT"].includes(req.method) || !req.body || !Object.keys(req.body).some(key => ["image", "images"].includes(key))) {
				return next();
			}
	
			const { image } = req.body as { image: string, images: string[], id?: string };
	
			if (image && !image.includes(baseUrlStorage) && !image.includes(baseUrlStorageGoogle)) {
				req.body.image = await uploadImageBase64ToStorage(req);
			}
	
			return next();
		} catch (error) {
			return handleError(res, error);
		}
	});
} 

export default uploadFiles;