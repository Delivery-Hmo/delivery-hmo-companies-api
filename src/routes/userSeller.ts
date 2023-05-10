import { Application, Router } from "express";
import { create, getById, update, disable, listByUserAdmin } from '../controllers/userSeller'
import isAuthenticated from "../middlewares/isAuthenticated";
import isBranchOffice from "../middlewares/isBranchOffice";

const router = Router();

const RoutesUserSeller = (app: Application) => {
  router.get('/listByUserAdmin', isBranchOffice, listByUserAdmin);
  router.get('/getById', getById);
  router.post('/create', isBranchOffice, create);
  router.put('/update', update);
  router.patch('/disable', isBranchOffice, disable);

  app.use("/userSeller", [isAuthenticated], router);
}

export default RoutesUserSeller;