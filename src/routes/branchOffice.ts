import { Application, Router } from "express";
import { listByUserAdmin, paginatedListByUserAdmin, create, update, disable, getByUid } from "../controllers/branchOffice";
//import isAuthenticated from "../middlewares/isAuthenticated";
import isAdmin from "../middlewares/isAdmin";
import isBranchOffice from "../middlewares/isBranchOffice";

const router = Router();

const RoutesBranchOffice = (app: Application) => {
  router.get('/getByUid', /* isBranchOffice, */ getByUid);
  router.get('/paginatedListByUserAdmin', isAdmin, paginatedListByUserAdmin);
  router.get('/listByUserAdmin', isAdmin, listByUserAdmin);
  router.post('/create', isAdmin, create);
  router.put('/update', isBranchOffice, update);
  router.patch('/disable', isAdmin, disable);

  app.use("/branchOffice", /* [isAuthenticated], */ router);
}

export default RoutesBranchOffice;