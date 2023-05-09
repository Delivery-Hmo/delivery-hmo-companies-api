import { Application, Router } from "express";
import { create, getById, update, disable, listByUserAdmin } from "../controllers/userDeliveryMan";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const router = Router();

const RoutesUserDeliveryMan = (app: Application) => {
  router.get('/listByUserAdmin', isAdmin, listByUserAdmin);
  router.get('/getById', getById);
  router.post('/create', isAdmin, create);
  router.put('/update', update);
  router.patch('/disable', isAdmin, disable);

  app.use("/userDeliveryMan", [isAuthenticated], router);
}

export default RoutesUserDeliveryMan;
