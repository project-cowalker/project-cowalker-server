const express = require('express');
const router = express.Router();

//getAlarm
const getAlarm = require('./getAlarm');
router.use('/alarm', getAlarm);

module.exports = router;
