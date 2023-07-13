import { Application, Router } from "express";

const router = Router();

const RouteExample = (app: Application) => {
  router.get('/', async (req, res) => {
    res.status(200).send({ check: "OKtest1" });
  });

  app.use("/", router);
}

export default RouteExample;