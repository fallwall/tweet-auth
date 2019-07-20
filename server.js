const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const users = require('./routes/userRouter');
const { restrict } = require('./auth');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/users', users);

app.use('/ping', (req, res) => {
  res.json('pong');
});

app.get('/encourage', restrict, (req, res) => {
  const name = res.locals.name;
  res.json(`You are the sh*t, ${name}`);
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}!!`);
});