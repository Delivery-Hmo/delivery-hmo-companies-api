import { Application, Router } from "express";
import { create, getById, update, disable, listByUserAdmin } from "../controllers/userDeliveryMan";
import isAuthenticated from "../middlewares/authenticated";

const router = Router();

const RoutesUserDeliveryMan = (app: Application) => {
  router.get('/listByUserAdmin', listByUserAdmin);
  router.get('/getById', getById);
  router.post('/create', create);
  router.put('/update', update);
  router.patch('/disable', disable);

  app.use("/userDeliveryMan", [isAuthenticated], router);
}

export default RoutesUserDeliveryMan;
