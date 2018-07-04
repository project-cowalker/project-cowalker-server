const express = require('express');
const router = express.Router();

//project create
const postProject = require('./postProject');
router.use('/project', postProject);

// //project read
const getProject = require('./getProject');
router.use('/project', getProject);

module.exports = router;
