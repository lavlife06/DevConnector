const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');

// @route POST api/users
// desc   test route
// access Public

router.post(
  '/',
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
    const { name, email, password } = req.body;
    try {
      // See if user exits

      // Get users gravator

      // Encrypt password

      // Return jsonwebtokens
      res.send('Users route');
    } catch (err) {
      res.status(500).send('Server Error');
      console.error(err.message);
    }
  }
);

module.exports = router;
