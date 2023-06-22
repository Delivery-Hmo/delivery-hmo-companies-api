import { Application, Router } from "express";
import { list, update, disable, getByUid, create } from "../controllers/userAdmin";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const router = Router();

const RoutesUserAdmin = (app: Application) => {
  router.get('/list', list);
  router.get('/getByUid', getByUid);
  router.post('/create', create);
  router.put('/update', update);
  router.patch('/disable', disable);

  app.use("/userAdmin", [isAuthenticated, isAdmin], router);
}

export default RoutesUserAdmin;