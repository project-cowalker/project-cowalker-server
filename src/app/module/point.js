const db = require('../module/pool.js');
let project = require('../model/schema/project');
let recruit = require('../model/schema/recruit');
let point = require('../model/schema/point');

/*
포인트 내역 삽입
*/

//작업 중단

/**
포인트

씨앗 1개 = 100원 

추천하는 순간 : 추천해준 사람에게 ‘씨앗 10개’,  
추천해서 지원 : 지원자, 추천한 사람 모두에게 포인트 20개
(중복 수혜 가능.)

공유
공유해서 지원할 경우 지원자 공유한 사람 둘 다 포인트 제공.  20개

[(추천멤버)님을 (프로젝트/모집 공고)에 추천하셔서 10 씨앗을 모았습니다.] : 추천한 사람이 받는 메시지
[(추천멤버)님이 (프로젝트)의 참여 멤버로 합류해 20 씨앗을 모았습니다.] : 추천한 사람이 받는 메시지
[(추천자)님의 추천으로 (프로젝트)의 참여 멤버로 합류해 20 씨앗을 모았습니다.] : 추천 당한 사람이 받는 메시지

[(프로젝트/모집 공고)을 공유하셔서 10 씨앗을 모았습니다.] : 공유한 사람이 받는 메시지
[(추천멤버)님이 (프로젝트)의 참여 멤버로 합류해 20 씨앗을 모았습니다.] : 공유한 사람이 받는 메시지
[(추천자)님의 공유하신 (프로젝트제목)의 참여 멤버로 합류해 20 씨앗을 모았습니다.] : 공유를 보고 지원한 사람이 받는 메시지


*/

const QUERY = 'select * from USER where user_idx = ?';
const QUERY1 = 'SELECT * FROM RECOMMEND WHERE recommend_idx = ?';

module.exports = {

    //1. 프로젝트 추천
    //프로젝트idx, 타겟idx
    recommendProject: async (...args) => {
        const project_idx = args[0];
        const user_idx = args[1];

        let project_name;
        await project.find({
            _id: project_idx
        }, function (err, docs) {
            if (err) {
                return -1;
            } else {
                project_name = docs[0].title;
            }
        })

        log();

        let msg = project_name + " 프로젝트를 추천하셔서 10 씨앗을 모았습니다.";
        point.create({
            user_idx: user_idx,
            contents: msg
        });

        
        return;
    },
    //2. 모집 공고 추천
    //모집공고 idx, 타겟idx
    recommendRecruit: async (...args) => {
        const recruit_idx = args[0];
        const user_idx = args[1];

        let position;
        let project_idx;
        let project_name;

        await recruit.find({
            _id: recruit_idx
        }, function (err, docs) {
            if (err) {
                return -1;
            } else {
                position = docs[0].position;
                project_idx = docs[0].project_idx
            }
        });

        await project.find({
            _id: project_idx
        }, function (err, docs) {
            if (err) {
                return -1;
            } else {
                project_name = docs[0].title;
            }
        });

        let msg = project_name + "의 " + position + " 역활을 추천하셔서 10 씨앗을 모았습니다.";
        point.create({
            user_idx: user_idx,
            contents: msg
        });
        return;
    },
    //3. 합류
    //project_idx, 타겟idx, applicant_idx;
    //[(추천멤버)님이 (프로젝트)의 참여 멤버로 합류해 20 씨앗을 모았습니다.]
    join: async (...args) => {
        const project_idx = args[0];
        const user_idx = args[1];
        const applicant_idx = args[2];

        await project.find({
            _id: project_idx
        }, function (err, docs) {
            if (err) {
                return -1;
            } else {
                let msg = docs[0].title + " 프로젝트를 추천하셔서 10 씨앗을 모았습니다.";
                point.create({
                    user_idx: user_idx,
                    contents: msg
                });
                return;
            }
        })
    },
    //4. 추천 합류
    recommendJoin: async (...args) => {

    },
    //5. 공유 합류
    shareJoin: async (...args) => {

    }
};
