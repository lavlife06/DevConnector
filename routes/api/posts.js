const express = require('express');
const router = express.Router();
const verify = require('../../Middleware/verify_mv');

// @route GET api/posts
// desc   test route
// access Public

router.get('/', verify, (req, res) => {
  res.json('Posts route');
});

module.exports = router;
