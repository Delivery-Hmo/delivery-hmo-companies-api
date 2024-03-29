import { checkSecureImage, compreesImage } from "../utils/functions";
import { baseUrlStorageGoogle, urlImageDefaultProfile } from "../constants";
import { deleteFile, uploadFile } from "../repositories/firebaseStorage";
import { getByIdAllUserModels } from "../repositories";
import { NameModelsUsers, Users } from "../types";
import { handleErrorFunction } from "../utils/handleError";
import short from "short-uuid";

interface Props {
	routeController: string;
	image: string;
	id?: string;
	checkImage?: boolean;
}

export const uploadImageBase64ToStorage = async ({ routeController, image, id, checkImage }: Props) => {
	try {
		const fileBase64 = image.split(",")[1];

		if (checkImage) {
			await checkSecureImage(fileBase64);
		}

		//const contentType = image.split(";")[0].split(":")[1];
		const fileName = `${short.generate()}.jpeg`;
		const path = `images/${routeController}/${fileName}`;
		const buffer = Buffer.from(fileBase64, "base64");

		const content = await compreesImage(buffer);
		const url = await uploadFile(path, content);

		if (!id) return url;

		const nameModel = routeController.charAt(0).toUpperCase() + routeController.slice(1) as NameModelsUsers;
		const modelDoc = await getByIdAllUserModels<Users>(nameModel, id);

		if (modelDoc?.image && modelDoc.image !== urlImageDefaultProfile) {
			const fileName = modelDoc.image.split(baseUrlStorageGoogle)[1].split('?')[0];

			deleteFile(fileName);
		}

		return url;
	} catch (error) {
		throw handleErrorFunction(error);
	}
}