const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const signup = require('../../model/req/SignupReq');
const apply=require('../../model/schema/apply');

router.post('/', async(req, res) => {
   apply.create({
       portfolio_url : req.body.portfolio_url,
       introduce : req.body.introduce,
       recruit_idx : req.body.recruit_idx,
       applicant_idx : req.body.applicant_idx,
       join : req.body.join
   },
   function(err, docs){
       console.log(err);
       if(err) return res.status(405).send("실패");
       res.status(200).send(docs);
   })
});

router.get('/', async(req, res) => {
   apply.find(function(err, applies){
       if(err) return res.status(500).send({error: 'database failure'});
       res.json(applies);
   })
});





module.exports = router;
