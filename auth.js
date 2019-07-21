const jwt = require('jsonwebtoken');

const SECRET = 'longasssecret';

const genToken = (payload) => {
  const token = jwt.sign(payload, SECRET);
  return token;
};

const restrict = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, SECRET);
    // res.locals = user.userData;
    res.locals.user = user
    // console.log( `user: ${res.locals}`);
    next();
  } catch (e) {
    console.log(e);
    res.status(401).send(e.messgae);
  }
};

module.exports = {
  genToken,
  restrict,
};
