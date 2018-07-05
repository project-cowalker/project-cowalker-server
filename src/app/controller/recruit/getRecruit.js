const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const project = require('../../model/schema/project');
const recruit = require('../../model/schema/recruit');
const recruitQuestion=require('../../model/schema/recruit_question');


// //프로젝트 선택 -> 모집 공고 전체 조회
router.get('/:project_idx/recruit', async (req, res, next) => {
    let project_idx=req.params.project_idx;
    let data = new Array();

    //1. 토큰 값 받아오기 
    const ID = jwt.verify(req.headers.authorization);
    console.log("ID: "+ID);

    //2. project테이블 접근해서, user_idx(프로젝트 개설자 아이디 )가지고 와야해  
    project.find({
      _id : project_idx
    },function(err,result){
        if(err){
          res.status(405).send({
            message:"database failure"
          });
        }else{
          let user_idx=result[0].user_idx;  // 개설자 user_idx를 꺼내오자 
          console.log("user_idx:"+user_idx);

           // 3. recruit테이블에서 모집 공고 조회 
           recruit.find({
            project_idx : project_idx

           },function(err,result){

            if(err){
              res.status(405).send({
                message : "database failure"
            });
            }else{

          // dday계산
          console.log(result[0].end_date);
             var now = new Date();
             console.log(now);

          for(let i = 0; i < result.length; i++) {
            
            let temp = {
                recruit_idx: "",
                position : "",
                number : "",
                task : "",
                dday:""
            }

              // dday계산
              var gap=result[i].end_date.getTime()-now.getTime();
              var calculateDday = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;
             

             // 양수면 앞에 +를 붙여야해 
             if(calculateDday>0){
                calculateDday='+'+calculateDday;
             }

              temp.recruit_idx = result[i]._id;
              temp.position=result[i].position;
              temp.number=result[i].number;
              temp.task=result[i].task;
              temp.dday=calculateDday;
              data.push(temp);

          }

          res.status(200).send({
            message:"success",
            result :data,
            ID : ID,
            user_idx : user_idx 
          });
      }

    });

    }
  });
   
});

//프로젝트 선택 -> 모집 공고 세부 조회
router.get('/:project_idx/recruit/:recruit_idx', async (req, res, next) => {

    let project_idx=req.params.project_idx;
    let recruit_idx=req.params.recruit_idx;

    console.log(project_idx);
    console.log(recruit_idx);

    let data = new Array();

     //1. 토큰 값 받아오기 
    const ID = jwt.verify(req.headers.authorization);
    console.log("ID: "+ID);

    //2. project테이블 접근해서, user_idx(프로젝트 개설자 아이디 )가지고 와야해  
    project.find({
      _id : project_idx
    },function(err,result){
        if(err){
          res.status(405).send({
            message:"database failure"
          });
        }else{

          let user_idx=result[0].user_idx;  // 개설자 user_idx를 꺼내오자 
          console.log("user_idx:"+user_idx);

          //3. recruit_idx마다 찾아야해  
          recruit.find({
            _id : recruit_idx
          },function(err,result){

          if(err){
            res.status(405).send({
              message:"database failure"
          });
          }else{
          
           
          for(let i = 0; i < result.length; i++) {
            
            let temp = {
                start_date : "",
                end_date : "",
                position : "",
                number : "",
                task : "",
                activity : "",
                reward:"",
                area:"",
                ability:"",
                career :"",
                preference:"",
                comment:"",
                create_at:""
            }


             temp.start_date=result[i].start_date;
             temp.end_date=result[i].end_date;
             temp.position=result[i].position;
             temp.number=result[i].number;
             temp.task=result[i].task;
             temp.activity=result[i].activity;
             temp.reward=result[i].reward;
             temp.area=result[i].area;
             temp.ability=result[i].ability;
             temp.career=result[i].career;
             temp.preference=result[i].preference;
             temp.comment=result[i].comment;
             temp.create_at=result[i].create_at;
             data.push(temp);

          }

          res.status(200).send({
            message:"success",
            result :data,
            ID: ID,
            user_idx :user_idx
          });
      }

    });
          

        }  
    });

   
  });



module.exports = router;
