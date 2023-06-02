import { Request } from "express";
import { checkSecureImage, compreesImage } from "../utils/functions";
import { baseUrlStorage, baseUrlStorageGoogle } from "../constants";
import { deleteFileRepo, uploadFileRepo } from "../repositories/firebaseStorageRepo";
import { getByIdAllModelsRepo } from "../repositories/allModelsRepo";
import { NameModels } from "../types";
import { handleErrorFunction } from "../utils/handleError";
import { v4 as uuidv4 } from 'uuid';

export const uploadImageBase64ToStorage = async (req: Request) => {
	try {
		const { image, id } = req.body as { image: string, images: string[], id?: string };
		const fileBase64 = image.split(",")[1];

	  await checkSecureImage(fileBase64);

		const routeController = req.originalUrl.replace("/", "").split("/")[0];
		//const contentType = image.split(";")[0].split(":")[1];
		const fileName = `${uuidv4()}-${new Date().getTime()}.jpeg`;
		const path = `images/${routeController}/${fileName}`;
		const buffer = Buffer.from(fileBase64, "base64");

		const content = await compreesImage(buffer);
		const url = await uploadFileRepo(path, content);

		if (id) {
			const routeController = req.originalUrl.replace("/", "").split("/")[0];
			const nameModel = routeController.charAt(0).toUpperCase() + routeController.slice(1) as NameModels;

			const modelDoc = await getByIdAllModelsRepo(nameModel, id);

			if (modelDoc && !modelDoc.image.includes(baseUrlStorage)) {
				const fileName = modelDoc.image.split(baseUrlStorageGoogle)[1].split('?')[0];

				await deleteFileRepo(fileName);
			}
		}

		return url;
	} catch (error) {
		throw handleErrorFunction(error, "Error al subir la imagen.");
	}
}