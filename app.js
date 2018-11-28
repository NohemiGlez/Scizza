const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passportSetup = require('./config/passportSetup');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const indexRouter = require('./routes/index');
const profileRouter = require('./routes/profile');
const developerMembersRouter = require('./routes/developerMembers');
const projectsRouter = require('./routes/projects');
const authSocialLoginRouter = require('./routes/authSocialLogin');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const pendingRouter = require('./routes/pending');
const finishedRouter = require('./routes/finished');
const projectRouter = require('./routes/project');
const developerTeamsRouter = require('./routes/developerTeams');
const userSkillsRouter = require('./routes/userSkills');
const userStoriesRouter = require('./routes/userStories');
const sprintsRouter = require('./routes/sprints');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [
      keys.session.cookieKey
    ]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/profile', profileRouter);
app.use('/developerMembers', developerMembersRouter);
app.use('/projects', projectsRouter);
app.use('/auth', authSocialLoginRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/pending', pendingRouter);
app.use('/finished', finishedRouter);
app.use('/project', projectRouter);
app.use('/developerTeams', developerTeamsRouter);
app.use('/userSkills', userSkillsRouter);
app.use('/userStories', userStoriesRouter);
app.use('/sprints', sprintsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
