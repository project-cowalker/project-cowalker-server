const express = require('express');
const router = express.Router();

//postApply
const postApply = require('./postApply');
router.use('/apply', postApply);

//getApply
const getApply = require('./getApply');
router.use('/apply', getApply);

//putAddTeamMember
const putAddTeamMember = require('./putAddTeamMember');
router.use('/apply', putAddTeamMember);

//delete
const deleteApply = require('./deleteApply');
router.use('/apply', deleteApply);


module.exports = router;
