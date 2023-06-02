import { Application, Router } from "express";
import { create } from "../controllers/userAdmin";

const router = Router();

const RoutesUserAdminPublic = (app: Application) => {
  router.post('/create', create);
  app.use("/userAdminPublic", router);
}

export default RoutesUserAdminPublic;