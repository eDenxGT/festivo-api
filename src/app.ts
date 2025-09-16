//* ====== DI Imports ====== *//
import 'reflect-metadata';
import './infrastructure/di/resolver';

//* ====== Other Imports ====== *//
import { MongoConnect } from './infrastructure/database/mongoDb/mongoConnect';
import { ExpressServer } from './infrastructure/http/server';
import envConfig from './shared/config';
import logger from './shared/utils/logger';

//* ====== Instance Creation ====== *//
const server = new ExpressServer();
const mongoConnect = new MongoConnect();

//* ====== Database Connection ====== *//
mongoConnect.connectDb();

//* ====== Server Startup ====== *//
server.getApp().listen(envConfig.server.PORT, () => {
  logger.success(
    `Server running on port ${envConfig.server.PORT} in ${envConfig.server.NODE_ENV} mode`
  );
});
