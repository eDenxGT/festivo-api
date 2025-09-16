import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Festivo API - Event Management and Ticketing System',
      version: '1.0.0',
      description:
        'API docs for Event Management & Ticket Distribution Platform'
    }
  },
  apis: ['./src/interface/routes/*.ts']
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app: Application) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export { setupSwagger };
