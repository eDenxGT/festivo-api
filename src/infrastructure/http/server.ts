//* ====== Module Imports ====== *//
import express, { Application, urlencoded } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import helmet from 'helmet';

//* ====== Config Imports ====== *//
import envConfig from '../../shared/config';
import logger from '../../shared/utils/logger';

//* ====== Middleware Imports ====== *//
import { notFound } from '../../interface/middlewares/not-found';

//* ====== Route Imports ====== *//
import { AuthRoutes } from '../../interface/routes/auth.route';
import { PrivateRoutes } from '../../interface/routes/private.route';
import { setupSwagger } from '../../shared/swagger';
import { errorHandler } from '../../interface/middlewares/error.middleware';

//* ====== Express App ====== *//
export class ExpressServer {
  private _app: Application;

  constructor() {
    this._app = express();

    logger.log('Starting Server...');

    this.configureMiddlewares();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  //* ====== Middlewares Configurations ====== *//
  private configureMiddlewares(): void {
    this._app.use(express.json());
    this._app.use(urlencoded({ extended: true }));

    this._app.use(morgan(envConfig.loggerStatus));

    this._app.use(helmet());

    // to tell
    this._app.set('trust proxy', 1);

    this._app.use(
      cors({
        origin: envConfig.cors.ALLOWED_ORIGIN,
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
      })
    );

    this._app.use(cookieParser());

    this._app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 1000
      })
    );

    setupSwagger(this._app);

    logger.log('Middlewares Configured');
  }

  //* ====== Routes Configurations ====== *//
  private configureRoutes(): void {
    this._app.use('/api/v1/auth', new AuthRoutes().router);
    this._app.use('/api/v1/pvt', new PrivateRoutes().router);

    //* catches unhandled routes (used regex because of express's latest version supports this)
    this._app.use(/.*/, notFound);

    logger.log('Routes Configured');
  }

  //* ====== Error Configurations ====== *//
  private configureErrorHandling(): void {
    this._app.use(errorHandler);

    logger.log('Error Handling Configured');
  }

  //* ====== Get App ====== *//
  public getApp(): Application {
    return this._app;
  }
}
