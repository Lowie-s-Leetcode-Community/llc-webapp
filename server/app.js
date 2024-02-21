const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require("helmet");

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const missionsRouter = require('./routes/missions');
const problemsRouter = require('./routes/problems');
const leaderboardRouter = require('./routes/leaderboard');

const winstonLogger = require('./logger');
require('dotenv').config();

const app = express();

// Winston demo
winstonLogger.info("LLC V0.5 WEBAAPP STARTED");

main().catch((err) => winstonLogger.error(err));
async function main() {
}

app.use(helmet());
app.use(express.static(path.join(__dirname, "build")));

let corsOptions = { 
  origin : process.env.NODE_ENV === 'production' ? [process.env.CLIENT_REDIRECT_URL] : '*',
} 

winstonLogger.debug("Enviroment: " + process.env.NODE_ENV);
 
app.use(cors(corsOptions)) 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/missions', missionsRouter);
app.use('/api/problems', problemsRouter);
app.use('/api/leaderboard', leaderboardRouter);

app.use((req, res, next) => {
  next(createError(404));
});

app.get('*', (req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
