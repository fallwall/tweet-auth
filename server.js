const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const users = require('./routes/userRouter');
const tweets = require('./routes/tweetRouter');
const { restrict } = require('./auth');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/users', users);
app.use('/tweets', tweets);

app.use('/ping', (req, res) => {
  res.json('pong');
});

app.get('/encourage', restrict, (req, res) => {
  console.log(res.locals.user);
  const { name } = res.locals.user.userData;
  const msg = `You are the sh*t, ${name}`;
  res.json({ msg });
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}!!`);
});