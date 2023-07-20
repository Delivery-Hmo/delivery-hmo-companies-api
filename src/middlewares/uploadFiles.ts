import { handleError } from "../utils/handleError";
import { Application } from "express";
import { uploadImageBase64ToStorage } from "../services/firebaseStorage";
import { checkSecureImage } from "../utils/functions";

const uploadFiles = (app: Application) => {
	app.use(async (req, res, next) => {
		try {
			if (!["POST", "PUT"].includes(req.method) || !req.body || !Object.keys(req.body).some(key => ["image", "images"].includes(key))) {
				return next();
			}
	
			const { image, images, id } = req.body as { image: string, images: string[], id?: string };
			const { originalUrl } = req;
	
			if (image) {
				req.body.image = await uploadImageBase64ToStorage({ originalUrl, image, id, checkImage: true });
			}

			if (images.length) {
				await Promise.all(images.map(image => {
					const fileBase64 = image.split(",")[1];

				  return checkSecureImage(fileBase64);
				}));
				
				const allResultsImages = await Promise.allSettled(images.map(image => uploadImageBase64ToStorage({ originalUrl, image, id })));

				const resultImagesRejected = allResultsImages.find(image => image.status === 'rejected') as PromiseRejectedResult | undefined;

				if (resultImagesRejected) {
					return handleError(res, resultImagesRejected.reason);
				}

				const resultsImagesFulfilled = allResultsImages.filter(image => image.status === 'fulfilled') as PromiseFulfilledResult<string>[];

				req.body.images = resultsImagesFulfilled.map(image => image.value);
			}
	
			return next();
		} catch (error) {
			return handleError(res, error);
		}
	});
} 

export default uploadFiles;