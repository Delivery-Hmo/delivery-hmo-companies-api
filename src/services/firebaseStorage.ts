import { Request } from "express";
import { checkSecureImage, compreesImage } from "../utils/functions";
import { baseUrlStorage, baseUrlStorageGoogle } from "../constants";
import { deleteFile, uploadFile } from "../repositories/firebaseStorage";
import { getByIdAllModels } from "../repositories/allModels";
import { NameModels } from "../types";
import { handleErrorFunction } from "../utils/handleError";
import short from "short-uuid";

export const uploadImageBase64ToStorage = async (req: Request) => {
	try {
		const { image, id } = req.body as { image: string, images: string[], id?: string };
		const fileBase64 = image.split(",")[1];

	  await checkSecureImage(fileBase64);

		const routeController = req.originalUrl.replace("/", "").split("/")[0];
		//const contentType = image.split(";")[0].split(":")[1];
		const fileName = `${short.generate()}.jpeg`;
		const path = `images/${routeController}/${fileName}`;
		const buffer = Buffer.from(fileBase64, "base64");

		const content = await compreesImage(buffer);
		const url = await uploadFile(path, content);

		if (id) {
			const routeController = req.originalUrl.replace("/", "").split("/")[0];
			const nameModel = routeController.charAt(0).toUpperCase() + routeController.slice(1) as NameModels;

			const modelDoc = await getByIdAllModels(nameModel, id);

			if (modelDoc && !modelDoc.image.includes(baseUrlStorage)) {
				const fileName = modelDoc.image.split(baseUrlStorageGoogle)[1].split('?')[0];

				await deleteFile(fileName);
			}
		}

		return url;
	} catch (error) {
		throw handleErrorFunction(error, "Error al subir la imagen.");
	}
}