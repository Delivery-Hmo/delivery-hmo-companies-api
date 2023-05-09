import { Application, Router } from "express";
import { listByUserAdmin, paginatedListByUserAdmin, create, update, disable, getByUid } from "../controllers/branchOffice";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";

const router = Router();

const RoutesBranchOffice = (app: Application) => {
  router.get('/getByUid', getByUid);
  router.get('/paginatedListByUserAdmin', isAdmin, paginatedListByUserAdmin);
  router.get('/listByUserAdmin', isAdmin, listByUserAdmin);
  router.post('/create', isAdmin, create);
  router.put('/update',  update);
  router.patch('/disable', isAdmin, disable);

  app.use("/branchOffice", [isAuthenticated], router);
}

export default RoutesBranchOffice;