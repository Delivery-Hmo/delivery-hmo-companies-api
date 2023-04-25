import { Application, Router } from "express";
import { create, getById, update, disable, listByUserAdmin } from '../controllers/userSeller'
import isAuthenticated from "../middlewares/authenticated";

const router = Router();

const RoutesUserSeller = (app: Application) => {
  router.get('/listByUserAdmin', listByUserAdmin);
  router.post('/create', create);
  router.get('/getById',getById);
  router.put('/update', update);
  router.patch('/disable', disable);

  app.use("/userSeller", [isAuthenticated], router);
}

export default RoutesUserSeller;