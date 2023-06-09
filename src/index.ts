import express from 'express';
import { initializeApp, cert } from 'firebase-admin/app';
import configServer, { server, serviceAccount, storageBucket } from './configServer';
import { connectDB } from './configServer/mongodb';
import routes from './routes';
import uploadFiles from "./middlewares/uploadFiles";
//import cluster from 'cluster';

const app = express();
try {
  configServer(app);
  initializeApp({ credential: cert(serviceAccount), storageBucket });
  await connectDB();
  uploadFiles(app);
  await routes(app);

  /*   
   const numCpus = require('os').cpus().length;
   
   if(cluster.isPrimary) {
     for (let i = 0; i < numCpus; i++) {
       cluster.fork();
     }
 
     return;
   }
 */

  const expressServer = app.listen(app.get('port'), server.HOST, () => {
    console.log(`App listening server on http://${server.HOST}:${app.get('port')}`);
  });

  expressServer.on("error", (error) => {
    console.error(error);
  });
} catch (error) {
  console.error(error);
}

export default app;