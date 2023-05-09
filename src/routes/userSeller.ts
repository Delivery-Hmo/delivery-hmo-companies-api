import { Application, Router } from "express";
import { create, getById, update, disable, listByUserAdmin } from '../controllers/userSeller'
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const router = Router();

const RoutesUserSeller = (app: Application) => {
  router.get('/listByUserAdmin', isAdmin, listByUserAdmin);
  router.post('/create', isAdmin, create);
  router.get('/getById', getById);
  router.put('/update', update);
  router.patch('/disable', isAdmin, disable);

  app.use("/userSeller", [isAuthenticated], router);
}

export default RoutesUserSeller;