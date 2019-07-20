const { Router } = require('express');
const bcrypt = require('bcrypt');
const { Tweet, User } = require('../models');
const { restrict } = require('../auth');

const tweets = Router();

tweets.post('/', restrict, async (req, res) => {
  const tweet = await Tweet.create(req.body);
  const user = await User.findByPk(res.locals.user.id);
  await tweet.setUser(user);
  res.json(tweet);
});

tweets.get('/', async (req, res) => {
  const allTweets = await Tweet.findAll();
  res.json(allTweets);
});

module.exports = tweets;