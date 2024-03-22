import { Application, Router } from "express";
import { create, getById, update, disable, listByUserAdmin, getSellerSuperAdmin } from '../controllers/userSeller'
import isAuthenticated from "../middlewares/isAuthenticated";
import isBranchOffice from "../middlewares/isBranchOffice";
import { validateImages } from "../controllers/branchOffice";
import isSuperAdmin from "../middlewares/isSuperAdmin";

const router = Router();

const RoutesUserSeller = (app: Application) => {
  //cambiar nombre a esta ruta
  router.get('/listByUserAdmin', isBranchOffice, listByUserAdmin);
  router.get('/getById', getById);
  router.get('/getSellerSuperAdmin', isSuperAdmin, getSellerSuperAdmin);
  router.post('/create', isBranchOffice, create);
  router.put('/update', update);
  router.patch('/disable', isBranchOffice, disable);
  router.put('/validateImages', isBranchOffice, validateImages)

  app.use("/userSeller", [isAuthenticated], router);
}

export default RoutesUserSeller;