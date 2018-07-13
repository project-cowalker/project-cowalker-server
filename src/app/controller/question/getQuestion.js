const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const hash = require('../../module/hash.js');
let recruit_question = require('../../model/schema/recruit_question');

//질문 가지고 오기 : get
router.get('/:recruit_idx', function (req, res) {

	let recruit_idx = req.params.recruit_idx;
	let resultmessage;

	recruit_question.find({
		recruit_idx: recruit_idx
	}, function (err, result) {
		if (err) {
			res.status(405).send({
				message: "database failure"
			});
		} else {
			if(result.length != 0) {
				resultmessage = result[0].question;
			}else {
				resultmessage = "";
			}
			console.log(result);
			return res.status(200).send({
				message: "success",
				result: resultmessage
			});
		}
	});
});


module.exports = router;