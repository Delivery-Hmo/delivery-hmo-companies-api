import { handleError } from "../utils/handleError";
import { Application } from "express";
import { uploadImageBase64ToStorage } from "../services/firebaseStorage";
import { checkSecureImage } from "../utils/functions";
import { deleteFile } from "../repositories/firebaseStorage";
import { baseUrlStorageGoogle } from "../constants";
import { getUserModelsByRoute } from "../services";
import { BranchOffice } from "../interfaces/users";

interface UploadFiles {
	image: string;
	images?: string[];
	oldImages?: string[];
	id?: string;
	failedImages?: number;
}

const uploadFiles = (app: Application) => {
	app.use(async (req, res, next) => {
		try {
			if (!["POST", "PUT"].includes(req.method) || !req.body || !Object.keys(req.body).some(key => ["image", "images"].includes(key))) {
				return next();
			}

			const { originalUrl } = req;
			const routeController = originalUrl.replace("/", "").split("/")[0];

			let { image, images, oldImages, id } = req.body as UploadFiles;
			let imagesNotDeleted: string[] = [];

			if (image) {
				req.body.image = await uploadImageBase64ToStorage({ routeController, image, id, checkImage: true });
			}

			if (oldImages?.length) {
				//esta linea por ahora quedara asi porque branchOffide es el unico que tiene multiplde imagen.
				const model = await getUserModelsByRoute(routeController, id!) as any as BranchOffice;
				imagesNotDeleted = model.images.filter(image => !oldImages!.includes(image));

				Promise.all(oldImages.map(image => {
					const fileName = image.split(baseUrlStorageGoogle)[1].split('?')[0];

					return deleteFile(fileName);
				}));
			}

			if (images?.length) {
				images = images.filter(image => image);

				await Promise.all(images.map(image => {
					const fileBase64 = image.split(",")[1];

					return checkSecureImage(fileBase64);
				}));

				const allResultsImages = await Promise.allSettled(images.map(image => uploadImageBase64ToStorage({ routeController, image, id })));

				const resultsImagesRejected = allResultsImages.filter(image => image.status === 'rejected') as PromiseRejectedResult[];
				const resultsImagesFulfilled = allResultsImages.filter(image => image.status === 'fulfilled') as PromiseFulfilledResult<string>[];

				req.body.images = [...imagesNotDeleted, ...resultsImagesFulfilled.map(image => image.value)];
				req.body.failedImages = resultsImagesRejected.length;
			}

			delete req.body.oldImages;

			return next();
		} catch (error) {
			return handleError(res, error);
		}
	});
}

export default uploadFiles;