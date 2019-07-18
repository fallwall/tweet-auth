const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/ping', (req, res) => {
  res.json('pong');
});

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}!!`);
});