const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const recruit = require('../../model/schema/recruit');
const recruitQuestion=require('../../model/schema/recruit_question');


// //프로젝트 선택 -> 모집 공고 수정
router.put('/:project_idx/recruit/:recruit_idx', async (req, res, next) => {

    const ID = jwt.verify(req.headers.authorization);
    console.log(ID);

    if (ID != -1) {                    // case 1: -1이 아니면, 즉, token값이 제대로 들어오면,  
       let project_idx=req.params.project_idx;
       let recruit_idx=req.params.recruit_idx;

      // recruit update 
      recruit.update( { _id: recruit_idx }, { $set: req.body }, function(err, result){
        if(err){   
        console.log(err);  
          res.status(405).send({
            message: "database failure"
          });
        }else{
          console.log(result);
            // recruitQuestion update
          let questions=req.body.question_list;
          console.log(questions);

          recruitQuestion.update({ recruit_idx : recruit_idx }, { question: questions }, function(err, result){
            if(err){     
              res.status(405).send({
              message: "database failure"
            });
            }else{
          
              res.status(201).send({
                  message: "success"
              });
            }  
      });
        
      }
    }); 
    }else{                             // case 2 : token값이 제대로 들어오지 않으면,
      res.status(401).send({
        message:"access denied"
      })
    }

});


module.exports = router;

