const express = require('express');
const morgan = require('morgan');
const path = require('path');
const dotenv = require('dotenv');

const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');
const compression = require('compression');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const passport = require('passport');

const globalErrorHandler = require('./controllers/errorController.js');
const indexRouter = require('./routes/indexRoutes.js');
const adminRouter = require('./routes/adminRoutes.js');

const app = express();

dotenv.config({
  path: 'config.env'
});

app.enable('trust proxy');

// Set Body parser, reading data from body into req.body
app.use(
  express.json({
    limit: '10kb'
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: '10kb'
  })
);

// Method override
app.use(
  methodOverride((req) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// Serving static files
app.use(express.static(path.join(__dirname, '/public')));

// View engine setup
// app.use(expressLayout);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Set Cookie parser
app.use(cookieParser());

// Set Session Config
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    }, // 24 hour
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_CONNECTION.replace(
        '<PASSWORD>',
        process.env.DATABASE_PASSWORD
      )
    })
  })
);

// Passport config
require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

// Set security HTTP headers
app.use(helmet());

app.disable('etag');

//Limit requests from the same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  messege: 'Too many requests from this IP, Please try again in an hour!'
});
app.use('/', limiter);

//Date sanitization against NoSQL query injection
app.use(mongoSanitize());

//Data sanitization against XSS
app.use(xss());

// Implement CORS
app.use(cors());

app.options('*', cors());

app.use(compression());

app.disable('x-powered-by');

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  res.setHeader(
    'Content-Security-Policy',
    "script-src 'self' https://apis.google.com"
  );
  req.requestTime = new Date().toISOString();
  res.setHeader('Last-Modified', new Date().toUTCString());
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/dashboard', adminRouter);

app.all('*', (req, res, next) => {
  res.redirect('/404');
});

app.use(globalErrorHandler);

module.exports = app;
