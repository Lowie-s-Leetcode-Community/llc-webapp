const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const missionsRouter = require('./routes/missions');
const leaderboardRouter = require('./routes/leaderboard');

const myLogger = require('./logger');

const app = express();

myLogger.info("Hello World");
myLogger.error("Hello World!");

main().catch((err) => myLogger.error(err));
async function main() {
}

app.use(express.static(path.join(__dirname, "build")));
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/missions', missionsRouter);
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
