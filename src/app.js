const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { default: RedisStore } = require('rate-limit-redis');
const Redis = require('ioredis');
const authRoutes = require('./routes/auth.routes');
const accountRoutes = require('./routes/account.routes');
const dataHandlerRoute = require('./routes/dataHandler.routes');
const errorHandler = require('./middlewares/errorHandler');
const accountMemberRoutes = require('./routes/accountMember.routes');
const destinationRoutes=require('./routes/destination.routes');
const logRoutes = require('./routes/log.routes');
const { NODE_ENV } = require('./config/app-config');
const cookieParser = require('cookie-parser');
const authorize = require('./middlewares/authorize');
const { swaggerUi, specs } = require('./swagger');

const redisClient = new Redis();
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
const isDev = NODE_ENV === 'development';

const limiter = rateLimit({
  store: isDev ? undefined : new RedisStore({
    sendCommand: (...args) => redisClient.call(...args)
  }),
  windowMs: 1000,
  max: 5,
  keyGenerator: (req) => req.headers['cl-x-token'] || req.ip,
  message: { success: false, message: 'Too many requests' },
});


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/server/incoming_data', limiter, dataHandlerRoute);
app.use('/auth', authRoutes);

// Admin-only routes: Full CRUD for accounts, destinations, account-members, and read logs
app.use('/accounts', authorize(['Admin']), accountRoutes);
app.use('/destinations', authorize(['Admin']), destinationRoutes);
app.use('/account-members', authorize(['Admin']), accountMemberRoutes);
app.use('/logs', authorize(['Admin', 'Normal user']), logRoutes);  // Both can read logs

// For normal users (Read/Update on accounts/destinations, read logs/members)
app.use('/accounts', authorize(['Admin', 'Normal user']), accountRoutes);
app.use('/destinations', authorize(['Admin', 'Normal user']), destinationRoutes);
app.use('/account-members', authorize(['Admin', 'Normal user']), accountMemberRoutes);
app.use('/logs', authorize(['Admin', 'Normal user']), logRoutes);

app.use(errorHandler);
module.exports = app;
