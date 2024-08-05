const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

// Environment variables
const jwtSecret = process.env.JWT_SECRET || config.get('jwtSecret');

// Register user
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('role', 'Role is required').isIn(['maker', 'investor']),
    check('username', 'Username is required').not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role, username } = req.body;

    try {
      let userByEmail = await User.findOne({ email });
      if (userByEmail) {
        return res.status(400).json({ errors: [{ msg: 'User with this email already exists' }] });
      }

      let userByUsername = await User.findOne({ username });
      if (userByUsername) {
        return res.status(400).json({ errors: [{ msg: 'User with this username already exists' }] });
      }

      let user = new User({
        name,
        email,
        password,
        role,
        username
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          role: user.role
        }
      };

      jwt.sign(
        payload,
        jwtSecret,
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Login user
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    check('role', 'Role is required').isIn(['maker', 'investor'])
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch || user.role !== role) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
          role: user.role,
          name: user.name
        }
      };

      jwt.sign(
        payload,
        jwtSecret,
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token, role: user.role, name: user.name });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
