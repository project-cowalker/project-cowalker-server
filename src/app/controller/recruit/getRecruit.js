const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const recruit = require('../../model/schema/recruit');
const recruitQuestion=require('../../model/schema/recruit_question');




//프로젝트 선택 : 모집 get
router.post('/', async (req, res, next) => {

    



});


//이건 잠시 임시용.
router.get('/create', async(req, res) => {
   recruitQuestion.find(function(err, applies){
       if(err) return res.status(500).send({error: 'database failure'});
       res.json(applies);
   })
});





module.exports = router;
