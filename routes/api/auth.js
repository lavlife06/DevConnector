const express = require('express');
const router = express.Router();
const mwauth = require('../../middleware/mwauth');
const User = require('../../models/User');

// @route GET api/auth
// desc   test route
// access Public

router.get('/', mwauth, async (req, res) => {
  try {
    const userinfo = await User.findById(req.user.id).select('-password');
    res.json(userinfo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
