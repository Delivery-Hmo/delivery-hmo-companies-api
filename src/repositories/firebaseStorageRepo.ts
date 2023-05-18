import admin from "firebase-admin";

export const uploadFileRepo = async (path: string, content: Buffer) => {
  try {
    const file = admin.storage().bucket().file(path);

    await file.save(content);
  
    const [url] = await file.getSignedUrl({ action: "read", expires: "01-01-2045" });
  
    return url;
  } catch (error) {
    console.log(error);
    throw "Error al subir el archivo.";
  }
}

export const deleteFileRepo = async (fileName: string) => {
  try {
    const file = admin.storage().bucket().file(fileName);

    await file.delete();
  } catch (error) {
    console.log(error);
    throw "Error al eliminar el archivo.";
  }
}
