import 'dotenv/config';
import 'reflect-metadata';
import fs from 'fs';
import path from 'path';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { docs } from './docs/index';
import http from 'http';

import swaggerUi from 'swagger-ui-express';
import './utils/response/customSuccess';
import { errorHandler } from './middleware/errorHandler';
import { getLanguage } from './middleware/getLanguage';
import routes from './routes';
import { dbCreateConnection } from './typeorm/dbCreateConnection';

export const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(getLanguage);

try {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, '../log/access.log'), {
    flags: 'a',
  });
  app.use(morgan('combined', { stream: accessLogStream }));
} catch (err) {
  console.log(err);
}
app.use(morgan('combined'));

app.use('/', routes);

app.use(errorHandler);
const port = process.env.PORT || 4000;

(async () => {
  await dbCreateConnection();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
