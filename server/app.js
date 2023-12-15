const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const authFilter = require('./middleware/authFilter');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const homeRouter = require('./routes/home');
const missionsRouter = require('./routes/missions');
const profileRouter = require('./routes/profile');

const app = express();

mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(express.static(path.join(__dirname, "build")));
app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/index', indexRouter);
app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);
app.use('/api/home/', homeRouter);
app.use('/api/missions', missionsRouter);
app.use('/api/profile', profileRouter);
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
