import { Application, Router } from "express";
import { create, getById, update, disable } from "../controllers/commentsBranchOffice";
import isAuthenticated from "../middlewares/isAuthenticated";

const router = Router();

const RoutesCommentsBranchOffice = (app: Application) => {
  router.get('/getById', getById);
  router.post('/create', create);
  router.put('/update', update);
  router.patch('/disable', disable);

  app.use("/commentsBranchOffice", isAuthenticated, router);
}

export default RoutesCommentsBranchOffice;