import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { logger } from './middlewares/logger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import authRouter from './routers/auth.js';
import contactsRouter from './routers/contacts.js';
import { getEnvVar } from './utils/getEnvVar.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.static('uploads'));
  app.use(cookieParser());

  // using pino-http
  // app.use(logger);

  // contacts middleware
  app.use('/contacts', contactsRouter);

  // auth middleware
  app.use('/auth', authRouter);

  // api-docs middleware
  app.use('/api-docs', swaggerDocs());

  // error 404
  app.use(notFoundHandler);

  // error ctrlWrapper
  app.use(errorHandler);

  const port = Number(getEnvVar('PORT', 3000));

  app.listen(port, () => console.log(`Server running on ${port} port`));
};
