const express = require('express');
const router = express.Router();
const db = require('../../module/pool.js');
const jwt = require('../../module/jwt.js');
const project = require('../../model/schema/project');
const recruit = require('../../model/schema/recruit');
const apply = require('../../model/schema/apply');
const recruitQuestion = require('../../model/schema/recruit_question');

// //프로젝트 선택 -> 모집 공고 전체 조회
router.get('/:project_idx/recruit', async (req, res, next) => {
  let project_idx = req.params.project_idx;
  let data = new Array();
  var now = new Date();

  //1. recruit테이블에서 모집 공고 조회 
  recruit.find({
    project_idx: project_idx
  }, async function (err, result) {
    if (err) {
      res.status(405).send({
        message: "database failure"
      });
    } else {

      for (let i = 0; i < result.length; i++) {

        let temp = {
          recruit_idx: "",
          position: "",
          number: "",
          task: "",
          dday: ""
        }

        // dday계산
        var gap = result[i].end_date.getTime() - now.getTime();
        var calculateDday = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;

        // 양수면 앞에 +를 붙여야해 
        if (calculateDday > 0) {
          calculateDday = '+' + calculateDday;
        }

        temp.recruit_idx = result[i]._id;
        temp.position = result[i].position;
        temp.number = result[i].number;
        temp.task = result[i].task;
        temp.dday = calculateDday;
        data.push(temp);

      }

      res.status(200).send({
        message: "success",
        result: data
      });
    }
  });
});



//프로젝트 선택 -> 모집 공고 세부 조회
router.get('/:project_idx/recruit/:recruit_idx', async (req, res, next) => {

  let project_idx = req.params.project_idx;
  let recruit_idx = req.params.recruit_idx;
  let btnResult = "참여하기"; // 기본 default로 지정 
  let data = new Array();

  //1. 토큰 값 받아오기 
  const ID = jwt.verify(req.headers.authorization);


  recruit.find({
    _id: recruit_idx
  }, async function (err, result) {
    if (err) {
      res.status(405).send({
        message: "database failure"
      });
    } else {

      for (let i = 0; i < result.length; i++) {

        let temp = {
          start_date: "",
          end_date: "",
          position: "",
          number: "",
          task: "",
          activity: "",
          reward: "",
          area: "",
          ability: "",
          career: "",
          preference: "",
          comment: "",
          create_at: ""
        }

        temp.start_date = result[i].start_date;
        temp.end_date = result[i].end_date;
        temp.position = result[i].position;
        temp.number = result[i].number;
        temp.task = result[i].task;
        temp.activity = result[i].activity;
        temp.reward = result[i].reward;
        temp.area = result[i].area;
        temp.ability = result[i].ability;
        temp.career = result[i].career;
        temp.preference = result[i].preference;
        temp.comment = result[i].comment;
        temp.create_at = result[i].create_at;
        data.push(temp);

      }

      if (result[0].user_idx == ID) { // case 1: 개발자인 경우, 
        btnResult = "개발자";
        //console.log(btnResult);
      } else { // case 2: 개발자가 아닌경우 
        // 4. recruit_idx로 apply테이블 접근해서 application_idx를 가지고 와야해 
        apply.find({
          recruit_idx: recruit_idx,
          applicant_idx: ID
        }, async function (err, result) {
          if (err) {
            res.status(405).send({
              message: "database failure"
            });
          } else {

            // case 2-1: 개발자가 아니고, 팀에 아직 지원도 아직 안한 상태 ->"지원자"
            if (!result[0]) {
              btnResult = "참여하기";
            } else {
              // case 2-1: 개발자가 아닌데, 팀에 지원은 했고, 아직 수락을 못받은 경우 -> "참여 대기"
              if (result[0].join == 1) {
                btnResult = "참여완료";
                // case 2-2: 개발자가 아닌데, 팀에 지원은 했고, 거절을 당한경우 -> "참여 하기 "
              } else if (result[0].join == 2) {
                btnResult = "참여하기";
              } else {
                // case 2-3: 개발자가 아닌데, 팀에 지원은 했고, 거절을 당한경우 -> "참여 대기 "
                btnResult = "참여대기"
              }

            }


          }

        });
      }

      res.status(200).send({
        message: "success",
        result: data,
        btnResult: btnResult
      });
    }
  });
});



module.exports = router;