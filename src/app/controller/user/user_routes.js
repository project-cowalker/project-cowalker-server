const express = require('express');
const router = express.Router();

//signup
const signup = require('./signup');
router.use('/signup', signup);

// signin
const signin = require('./signin');
router.use('/signin', signin);

// user's projects
const user_project = require('./user_project');
router.use('/user/project', user_project);

module.exports = router;
