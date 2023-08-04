import { handleError } from "../utils/handleError";
import { Application } from "express";
import { uploadImageBase64ToStorage } from "../services/firebaseStorage";
import { checkSecureImage } from "../utils/functions";
import { deleteFile } from "../repositories/firebaseStorage";
import { baseUrlStorageGoogle } from "../constants";

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
			let { image, images, oldImages, id } = req.body as UploadFiles;

			if (image) {
				req.body.image = await uploadImageBase64ToStorage({ originalUrl, image, id, checkImage: true });
			}

			if (images?.length) {
				images = images.filter(image => image);

				await Promise.all(images.map(image => {
					const fileBase64 = image.split(",")[1];

					return checkSecureImage(fileBase64);
				}));

				const allResultsImages = await Promise.allSettled(images.map(image => uploadImageBase64ToStorage({ originalUrl, image, id })));

				const resultsImagesRejected = allResultsImages.filter(image => image.status === 'rejected') as PromiseRejectedResult[];
				const resultsImagesFulfilled = allResultsImages.filter(image => image.status === 'fulfilled') as PromiseFulfilledResult<string>[];

				req.body.images = resultsImagesFulfilled.map(image => image.value);
				req.body.failedImages = resultsImagesRejected.length;
			}

			if (oldImages?.length) {
				Promise.all(oldImages.map(image => {
					const fileName = image.split(baseUrlStorageGoogle)[1].split('?')[0];

					return deleteFile(fileName);
				}));
			}

			delete req.body.oldImages;

			return next();
		} catch (error) {
			return handleError(res, error);
		}
	});
}

export default uploadFiles;