const cors = require('cors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');

require('dotenv').config();
require('./config/database');

const usersRouter = require('./routes/api/users');
const pedalsRouter = require('./routes/api/pedals');
const rigsRouter = require('./routes/api/rigs');

const app = express();

app.use(cors());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/users', usersRouter);
app.use(require('./config/auth'));
app.use('/api/pedals', pedalsRouter);
app.use('/api/rigs', rigsRouter);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
