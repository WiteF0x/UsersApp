const express = require('express');
const router = express.Router();
const Users = require('../modules/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  try {
    if (req.body.login && req.body.password) {
      const user = await Users.findOne({ login: req.body.login });
      if (!user) return res.status(400).send('Email is not found');

      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) return res.status(400).send('Invalid password');

      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res.header('auth-token', token).send({ token: token, _id: user._id });

    }
  } catch (err) {
    res.send({ message: 'Invalid login or password' });
  }
})

router.post('/register', async (req, res) => {
  const userLogin = await Users.find({ login: req.body.login });
  const userName = await Users.find({ userName: req.body.userName });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  if ( userLogin.length === 0 && userName.length === 0 ) {
      const user = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        login: req.body.login,
        password: hashedPassword,
        userInfo: req.body.userInfo || '',
        userTypes: ['defaultUser'],
      })
      try {
        await user.save();
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send({ token: token, _id: user._id });

      }catch (err) {
        res.json({ message: err });
      }

  } else {
    userLogin.length !== 0 
    ? res.json({ message: 'This login is already in use' })
    : res.json({ message: 'This User Name is already in use' });
  }
});

module.exports = router;

module.exports = router;