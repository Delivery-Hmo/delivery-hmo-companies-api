import { Request } from "express";
import { checkSecureImage, getExtensionByContentType } from "../utils/functions";
import { baseUrlStorage, baseUrlStorageGoogle } from "../constants";
import { deleteFileRepo, uploadFileRepo } from "../repositories/firebaseStorageRepo";
import { getByIdAllModelsRepo } from "../repositories/allModelsRepo";
import { NameModels } from "../types";

export const uploadImageBase64ToStorage = async (req: Request) => {
	try {
		const { image, id } = req.body as { image: string, images: string[], id?: string };
		const fileBase64 = image.split(",")[1];

	  await checkSecureImage(fileBase64);

		const routeController = req.originalUrl.replace("/", "").split("/")[0];
		const contentType = image.split(";")[0].split(":")[1];
		const path = `images/${routeController}/${new Date().getTime()}.${getExtensionByContentType(contentType)}`;
		const content = Buffer.from(fileBase64, "base64");

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
		if(typeof error === "string") throw error;
		
		if(error instanceof Error) {
			throw error.message;
		}

		throw "Error al subir la imagen.";
	}
}