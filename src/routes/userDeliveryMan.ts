import { Application, Router } from "express";
import { create, getById, update, disable, listByUserAdmin } from "../controllers/userDeliveryMan";
import isAuthenticated from "../middlewares/isAuthenticated";
import isBranchOffice from "../middlewares/isBranchOffice";

const router = Router();

const RoutesUserDeliveryMan = (app: Application) => {
  router.get('/listByUserAdmin', isBranchOffice, listByUserAdmin);
  router.get('/getById', getById);
  router.post('/create', isBranchOffice, create);
  router.put('/update', update);
  router.patch('/disable', isBranchOffice, disable);

  app.use("/userDeliveryMan", [isAuthenticated], router);
}

export default RoutesUserDeliveryMan;
