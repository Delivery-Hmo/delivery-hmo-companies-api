import { Application, Router } from "express";
import { create,list,getById,update,disable } from "../controllers/commentsBranchOffice";

const router = Router();

const RoutesCommentsBranchOffice = (app: Application) => {
  router.get('/list', list);
  router.get('/getById', getById);
  router.post('/create',create);
  router.put('/update', update);
  router.patch('/disable', disable);

  app.use("/commentsBranchOffice", router);
}

export default RoutesCommentsBranchOffice;