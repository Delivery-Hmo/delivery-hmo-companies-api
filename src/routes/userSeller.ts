import { Application, Router } from "express";
import { create, getById, update, disable, listByUserAdmin, validateImages } from '../controllers/userSeller'
import isAuthenticated from "../middlewares/isAuthenticated";
import isBranchOffice from "../middlewares/isBranchOffice";

const router = Router();

const RoutesUserSeller = (app: Application) => {
  //cambiar nombre a esta ruta
  router.get('/listByUserAdmin', isBranchOffice, listByUserAdmin);
  router.get('/getById', getById);
  router.post('/create', isBranchOffice, create);
  router.put('/update', update);
  router.patch('/disable', isBranchOffice, disable);
  router.put('/validateImages', isBranchOffice, validateImages)

  app.use("/userSeller", [isAuthenticated], router);
}

export default RoutesUserSeller;