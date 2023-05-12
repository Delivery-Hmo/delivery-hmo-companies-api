import { Application, Router } from "express";
import { imagePrediction } from "../utils/functions";

const router = Router();

const RouteExample = (app: Application) => {
  router.get('/', async (req, res) => {
    await imagePrediction()
    res.status(200).send({ check: "OKtest1" });
  });

  app.use("/", router);
}

export default RouteExample;