import { Application, Router } from "express";
import { listByUserAdmin, paginatedListByUserAdmin, create, update, disable } from "../controllers/branchOffice";
import isAuthenticated from "../middlewares/authenticated";

const router = Router();

const RoutesBranchOffice = (app: Application) => {
  router.get('/paginatedListByUserAdmin', paginatedListByUserAdmin);
  router.get('/listByUserAdmin', listByUserAdmin);
  router.post('/create', create);
  router.put('/update', update);
  router.patch('/disable', disable);

  app.use("/branchOffice", [isAuthenticated], router);
}

export default RoutesBranchOffice;