const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route POST api/users
// desc   test route
// access Public

router.post(
  '/',
  // We want the info of user accordinf to the given below condition
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'PLease enter password with >6 letter').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { name, email, password } = req.body;
    try {
      // let user = await User.findOne({ email: email })
      //                  ||
      let user = await User.findOne({ email });

      // See if user exits
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exits' }] });
      }

      // Get users gravator
      let avatar = gravatar.url(email, {
        s: '200', // size
        r: 'pg', // makes sure that no naked images comes
        d: 'mm' // if user doesnt have a gravator then mm will handle
      });

      // Creating user instance
      user = new User({
        name,
        email,
        password,
        avatar
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save(); // In atlas data will be saved

      // Return jsonwebtokens
      let payload = {
        user: {
          id: user._id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.header('x-auth-token').json({ token });
        }
      );
    } catch (err) {
      res.status(500).send('Server Error');
      console.error(err.message);
    }
  }
);

module.exports = router;
