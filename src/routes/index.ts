import { Application } from "express";
import fs from "fs";
import path from "path";
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = async (app: Application) => {
  const files = fs.readdirSync(__dirname).filter(file => !file.includes("index") && !file.includes(".map"));

  for (const file of files) {
    try {
      const module = await import(`./${file}`);
      const route = module.default as (app: Application) => void;

      route(app);
    } catch (error) {
      console.log(error);
      continue;
    }
  }
}

export default routes;