import { Application, Router } from "express";
import { list, getById, update, disable, getByUid, verifyEmail } from "../controllers/userAdmin";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const router = Router();

const RoutesUserAdmin = (app: Application) => {
  router.get('/list', list);
  router.get('/getById', getById);
  router.get('/getByUid', getByUid);
  router.get('/verifyEmail', verifyEmail);
  router.put('/update', update);
  router.patch('/disable', disable);

  app.use("/userAdmin", [isAuthenticated, isAdmin], router);
}

export default RoutesUserAdmin;