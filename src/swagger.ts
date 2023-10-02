import swaggerUI from 'swagger-ui-express';
import { Express, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import { version } from '../package.json';

const swaggerDefinition: swaggerJSDoc.options = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  apis: ['/routes/v1/absent-request/*.ts'],
};
const swaggerSpec = swaggerJSDoc(options);

function swaggerDoc(app: Express, port: number | string) {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}

export default swaggerDoc;
