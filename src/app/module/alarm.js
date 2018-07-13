const db = require('../module/pool.js');
const fcmmodule = require('../module/fcm.js');
let alarm = require('../model/schema/alarm');
let project = require('../model/schema/project');
let recruit = require('../model/schema/recruit');

/*
알림 db 삽입
*/

/**
알림
1. 내 프로젝트에 누군가 지원서를 작성했을 경우
2. 추천자가 지원한 경우
3. 내가 합격한 경우
4. 내가 불합격한 경우
 프사 프로젝트 이름 프로젝트 idx 이름 시간
 */

const QUERY = 'select * from USER where user_idx = ?';
const QUERY1 = 'SELECT * FROM RECOMMEND WHERE recommend_idx = ?';

module.exports = {

    /**
     * [(지원멤버 이름) 님이 참여를 희망했습니다.]
    [축하합니다! [프로젝트 제목]의 참여 멤버가 되셨습니다.]
    [아쉽지만 [프로젝트 제목]의 참여 멤버가 되지 못하셨습니다.]
    */

    //내 프로젝트에 누군가 지원서를 작성했을 경우

    //추천자가 지원한 경우

    //모집idx, 프로젝트
    //alarm.apply(recruit_idx, ID);
    //프사 프로젝트 이름 프로젝트 idx 이름 시간
    apply: async (...args) => {
        const project_idx = args[0];
        const applicant_idx = args[1];

        let user = await db.execute2(QUERY, applicant_idx);
        let target;

        await project.find({
            _id : project_idx
        }, function (err, docs) {
            if (err) {
                return -1;
            } else {
                target = docs[0].user_idx;
                project_name = docs[0].title;
                let msg = user[0].name + "님이 참여를 희망했습니다.";

                alarm.create({
                    user_idx: target,
                    project_name: project_name,
                    contents: msg
                });
                // 푸시 알람 추가
                fcmmodule.fcmSend(target, project_name,msg);
                return;
            }

        })
    },

    //타겟 : 프로젝트 개설자
    //추천인 이름, 추천 받은 사람 = 지원서 작성자
    //추천id, 프로젝트id, 추천받은사람
    //[(추천인 이름) 님이 추천한 (추천멤버) 님이 참여를 희망했습니다.]
    recommendation: async (...args) => {
        const recommend_idx = args[0];
        const insertData = args[1];
        const applicant_idx = args[2];

        let user = await db.execute2(QUERY, applicant_idx);
        let temp = await db.execute2(QUERY1, recommend_idx);

        let target;

        let project_idx = insertData.project_idx;

        //1. 프로젝트를 추천한 경우
        let selectQuery = "SELECT * FROM RECOMMEND WHERE project_idx = ? and recruit_idx = ?";
        let projectQuery = await db.execute2(selectQuery, insertData.project_idx, insertData.recruit_idx);
        
        if(!projectQuery)
            return -1;
        
        let recommender = await db.execute2(QUERY, projectQuery[0].recommender_idx);

        await project.find({
            _id: project_idx
        }, function (err, projects) {
            if (err) {
                return -1;
            } else {
                target = projects[0].user_idx;
                project_name = projects[0].title;
                let msg = recommender[0].name + "님이 추천한 " + user[0].name + "님이 참여를 희망했습니다.";

                alarm.create({
                    user_idx: target,
                    project_name: project_name,
                    contents: msg
                });

                //푸시 알람 추가
                rcmmodule.fcmSend(target,project_name,msg);

                return;
            }
        });
    },

    //공유 없고
    
    //모집 공고 없고
  
    //3. 내가 합격한경우, 불합격한 경우
    //project_idx, join, ID
    //1이 수락, 2가 거절
    //내 아이디, 프로젝트 아이디
    join: async (...args) => {
        console.log("join들어왔따 ");
        const project_idx = args[0];
        const join = args[1];
        const ID = args[2];

        await project.find({
            _id: project_idx
        }, function (err, docs) {
            if (err) {
                return -1;
            } else {
                
                console.log(docs);
                console.log(docs[0].title);
                let project_name = docs[0].title;
                //합격
                if (join == 1) {
                    var msg = "축하합니다! " + project_name + "의 참여 멤버가 되셨습니다.";
                }
                //불합격한경우
                else {
                    var msg = "아쉽지만 " + project_name + "의 참여 멤버가 되지 못하셨습니다.";
                }
                alarm.create({
                    project_name : project_name,
                    user_idx: ID,
                    contents: msg
                });
                
                // 푸시 알람 추가
                fcmmodule.fcmSend(ID, project_name, msg);
                return;
            }
        })
    },
};
