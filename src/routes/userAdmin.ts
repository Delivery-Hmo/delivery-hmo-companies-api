import { Application, Router } from "express";
import { create,list,getById,update ,disable, getByUid, verifyEmail} from "../controllers/userAdmin";
import isAuthenticated from "../middlewares/authenticated";

const router = Router();

const RoutesUserAdmin = (app: Application) => {
  router.get('/list', list);
  router.get('/getById', getById);
  router.get('/getByUid', getByUid);
  router.get('/verifyEmail', verifyEmail);
  router.post('/create', create);
  router.put('/update', update);
  router.patch('/disable', disable);

  app.use("/userAdmin", [isAuthenticated], router);
}

export default RoutesUserAdmin;