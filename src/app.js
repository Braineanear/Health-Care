import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import helmet from 'helmet';
import xss from 'xss-clean';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import ejs from 'ejs';

import config from './config/config';
import { successHandle, errorHandle } from './config/morgan';
import limiter from './middlewares/rateLimiter';
import errorHandler from './utils/errorHandler';
import AppError from './utils/appError';
import routes from './routes/index';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.enable('trust proxy');

app.use(successHandle);
app.use(errorHandle);

// Set security HTTP headers
app.use(helmet());

// Set Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set Cookie parser
app.use(cookieParser());

//Data sanitization against XSS
app.use(xss());

// Implement CORS
app.use(cors());

app.options('*', cors());

app.use(compression());

app.disable('x-powered-by');

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/', limiter);
}

app.use('/', routes);

// When someone access route that does not exist
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// handle error
app.use(errorHandler);

/**
 * Exports express
 * @public
 */
export default app;
