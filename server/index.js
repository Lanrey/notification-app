/*
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes';
import { logger } from './helper';
import { getNotifications } from './services/consumer.service';


const PORT = Number(process.env.PORT) || 5001;
const app = express();

getNotifications();

// run cron job

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('combined', { stream: logger.stream }));

app.use((err, req, res, next) => {
  logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);

  res.status(500).send('server error, this will be resolved shortly!');

  next();
});

app.get('/', (request, response) => {
  response.status(200).send('Welcome to Cocoons Letters Limited Notification Service');
});

app.use('/api/v1', routes);

app.use('*', (request, response) => {
  response.status(404).send('Not Found');
});

app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));

export default app;
*/

/*
import *  as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import  getNotfication from './controllers/notification.controller';

var init = function(){

  const PROTO_PATH = path.join(
    __dirname,
    '..',
    '..',
    '..',
    '/notes-protos-nodejs/notification/notification.proto'
  );

  console.log(PROTO_PATH);

  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
    
  });

  let notification_proto = grpc.loadPackageDefinition(packageDefinition).notifcation;


  function main() {
 
    let server = new grpc.Server();
    server.addService(notification_proto.NotifcationService.service, getNotfication );
    
    server.bindAsync('0.0.0.0:30002', grpc.ServerCredentials.createInsecure(),()=>{
      server.start();
    });

    console.log('Listening on server ');
  
  }

  main();
  
}
exports.init = init;

*/

import { logger } from './helper';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { join } from 'path';
import { NotificationServiceService} from '../notes-protos-nodejs/notification/notification_grpc_pb';
import notification from './controllers/notification.controller';
import { getNotifications, getResetPassword, getVerifyEmail, getResetSuccessfulEmail, getWelcomeEmail, getResetPasswords } from './services/consumer.service';
const PORT = Number(process.env.PORT) || 30001;

const PROTO_PATH = join(__dirname, './notification.proto');
console.log(PROTO_PATH);
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const notificationProto = grpc.loadPackageDefinition(packageDefinition).notification;
const cleanup = (server) => {
  if (server) {
    logger.info('Shutting down...');
    server.forceShutdown();
  }
};
function main() {
  const addr = `0.0.0.0:${PORT}`;
  const server = new grpc.Server();
  const credentials = grpc.ServerCredentials.createInsecure();
  getNotifications();
  getResetPasswords();
  getResetSuccessfulEmails();
  getVerifyEmails();
  getWelcomeEmails();
  process.on('SIGINT', () => {
    logger.warn('Caught interrupt signal');
    cleanup(server);
  });
  server.addService(notificationProto.NotificationService.service, notification);
  server.bindAsync(addr, credentials, (error) => {
    if (error) {
      return cleanup(server);
    }
    server.start();
  });
  logger.info(`Listening on ${addr}`);
}
main();