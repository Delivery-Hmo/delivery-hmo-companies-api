import { Application, Router } from "express";
import { create, getByUid } from "../controllers/userAdmin";

const router = Router();

const RoutesUserAdminPublic = (app: Application) => {
  router.get('/getByUid', getByUid);
  router.post('/create', create);
  app.use("/userAdminPublic", router);
}

export default RoutesUserAdminPublic;