import express from 'express';
import admin from 'firebase-admin';
import configServer, { server, serviceAccount } from './configServer';
import startDb from './configServer/mongodb';
import routes from './routes';
//import cluster from 'cluster';

const app = express();

try {
  configServer(app);
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  await startDb();
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

  app.listen(app.get('port'), server.HOST, () => {
    console.log(`App listening server on http://${server.HOST}:${app.get('port')}`);
  });
  
} catch (error) {
  console.error(error);
}

export default app;