const express = require('express');
const router = express.Router();

//user
const user = require('./controller/user/user_routes');
router.use('/', user);

module.exports = router;
