const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const recruit = require('../../model/schema/recruit');
const recruitQuestion=require('../../model/schema/recruit_question');




//팀원 모집
router.post('/', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);
    console.log(ID);

    if (ID != -1) {						         // case 1: -1이 아니면, 즉, token값이 제대로 들어오면,  
        let question_list=req.body.question_list;   // 클라한테 배열형태로 질문 리스트를 받는다. 
        let recruit_idx=req.body.recruit_idx;
 
        // string to date 
        let start_date=req.body.start_date;
        let end_date=req.body.end_date;
        var startdate=new Date(start_date);
        var enddate=new Date(end_date);

        // db insert 
        recruit.create({
            project_idx : req.body.project_idx,
            position : req.body.position,
            start_date : startdate,
            end_date : enddate,
            number : req.body.number,
            task : req.body.task,
            activity : req.body.activity,
            reward : req.body.reward,
            area : req.body.area,
            ability : req.body.ability,
            career : req.body.career,
            preference : req.body.preference,
            comment : req.body.comment

        }, function(err, result){

            if(err){                        // 결과값이 만약 에러가 난다면, 405에서
                console.log(err);
                res.status(405).send({
                    message:"fail"
                });

            }else{                          // 성공


                recruitQuestion.create({
                    recruit_idx : req.body.recruit_idx,
                    question : question_list

                },function(err,result){
                     if(err){
                      // console.log(err);
                      res.status(405).send({
                          message:"fail"
                      });
                    }else{
                      // console.log(result);
                      res.status(200).send({
                        message:"success"
                      });
                    }
                });
           
              }
          });
        
        
    }else{							               // case 2 : token값이 제대로 들어오지 않으면,
    	res.status(401).send({
    		message:"access denied"
    	})
    }

});


//이건 잠시 임시용.
router.get('/create', async(req, res) => {
   recruitQuestion.find(function(err, applies){
       if(err) return res.status(500).send({error: 'database failure'});
       res.json(applies);
   })
});





module.exports = router;
