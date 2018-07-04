const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const recruit = require('../../model/schema/recruit');
const recruitQuestion=require('../../model/schema/recruit_question');




//팀원 모집
router.post('/create', async (req, res, next) => {
    const ID = jwt.verify(req.headers.authorization);
    console.log(ID);

    if (ID != -1) {						         // case 1: -1이 아니면, 즉, token값이 제대로 들어오면,  

        // var start_time = (new Date(req.body.start_date)).format('YYYY-MM-DD HH:mm:ss');
        // var end_time=(new Date(req.body.end_date)).format('YYYY-MM-DD HH:mm:ss');

        // console.log(start_time);
        // console.log(end_time);

        recruit.create({
            project_idx : req.body.project_idx,
            position : req.body.position,
            start_date : req.body.start_date,
            end_date : req.body.end_date,
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
                    message:"DB insert fail"
                });

            }else{                          // 성공

                let question_list=req.body.question_list;
                let recruit_idx=req.body.recruit_idx;

                console.log(question_list);
                console.log(question_list[0]);
                console.log(question_list);

                var questionTable="[";

                for(let i=0;i<question_list.length;i++){
                  questionTable+='{question:'+'\''+question_list[i]+'\''+', recruit_idx:'+recruit_idx+'},';
                }

                // console.log(questionTable);
                questionTable=questionTable.slice(0,-1);      // 마지막 , 을 제거해주기 위해 
                // console.log(questionTable);
              
                questionTable+=']';
                // var questionTable=[{question : question_list[0],recruit_idx:recruit_idx},{question : question_list[1],recruit_idx:recruit_idx}];
                console.log(questionTable);

                recruitQuestion.create(questionTable, function(err,result){
                    if(err){
                      // console.log(err);
                      res.status(405).send({
                          message:"DB insert Fail"
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


// router.post('/', async(req, res) => {
    
//    apply.create({
//        portfolio_url : req.body.portfolio_url,
//        introduce : req.body.introduce,
//        recruit_idx : req.body.recruit_idx,
//        applicant_idx : req.body.applicant_idx,
//        join : req.body.join
//    },
//    function(err, docs){
//        console.log(err);
//        if(err) return res.status(405).send("실패");
//        res.status(200).send(docs);
//    })
// });

// router.get('/', async(req, res) => {
//    apply.find(function(err, applies){
//        if(err) return res.status(500).send({error: 'database failure'});
//        res.json(applies);
//    })
// });





module.exports = router;
