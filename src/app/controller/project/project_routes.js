const express = require('express');
const router = express.Router();

//project create
const postProject = require('./postProject');
router.use('/project', postProject);

// //project read
const getProject = require('./getProject');
router.use('/project', getProject);

// //project delete
const deleteProject = require('./deleteProject');
router.use('/project', deleteProject);

// //project update
const updateProject = require('./updateProject');
router.use('/project', updateProject);

module.exports = router;
