const express = require('express');
const router = express.Router();

//signup
const signup = require('./signup');
router.use('/signup', signup);

// signin
const signin = require('./signin');
router.use('/signin', signin);

//signup
const test = require('./test');
router.use('/test', test);

module.exports = router;
