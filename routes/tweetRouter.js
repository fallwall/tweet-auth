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
  const allTweets = await Tweet.findAll({ include: [User] });
  res.json(allTweets);
});

tweets.delete('/:id', restrict, async (req, res) => {
  const allTweets = await Tweet.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(allTweets);
});

tweets.put('/:id', restrict, async (req, res) => {
  const tweet = await Tweet.update(
    req.body,
    {
      where: {
        id: req.params.id,
      },
    });
  res.json(tweet);
});

module.exports = tweets;