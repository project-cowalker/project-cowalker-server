const async = require('async');
const db = require('../module/pool.js');

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

module.exports = {
    //내 프로젝트에 누군가 지원서를 작성했을 경우
    //프로젝트idx, 프로젝트
    apply : async (...args) => {
        const ID = args[0];
        const post_id = args[1];
        const comment_id = args[2];
        let opponent_ID = await db.execute(opponent_post, post_id);
        let data = {
            ID : ID,
            opponent_ID : opponent_ID[0].ID_creator,
            to_type : "Posts",
            to_id : post_id,
            from_type : "Comments",
            from_id : comment_id
        };
        let result = await db.execute(notice, data);
        if(result) {
            return 1;
        }
        else {
            return -1;
        }
    },
    //2. 추천자가 지원한 경우
    recommender_apply : async (...args) => {
        const ID = args[0];
        const post_id = args[1];
        const comment_detail_id = args[2];
        let opponent_ID = await db.execute(opponent_post, post_id);
        let data = {
            ID : ID,
            opponent_ID : opponent_ID[0].ID_creator,
            to_type : "Posts",
            to_id : post_id,
            from_type : "CommentDetails",
            from_id : comment_detail_id
        };
        let result = await db.execute(notice, data);
        if(result) {
            return 1;
        }
        else {
            return -1;
        }
    },
    //3. 내가 합격한 경우
    pass : async (...args) => {
        const ID = args[0];
        const post_id = args[1];
        const collection_id = args[2];
        let opponent_ID = await db.execute(opponent_collections, collection_id);
        let data = {
            ID : ID,
            opponent_ID : opponent_ID[0].ID,
            to_type : "Posts",
            to_id : post_id,
            from_type : "Collections",
            from_id : collection_id
        };
        let result = await db.execute(notice, data);
        if(result) {
            return 1;
        }
        else {
            return -1;
        }
    },
    //4. 내가 불합격한 경우
    non_pass : async (...args) => {
        const ID = args[0];
        const post_id = args[1];
        let opponent_ID = await db.execute(opponent_post, post_id);
        let data = {
            ID : ID,
            opponent_ID : opponent_ID[0].ID_creator,
            to_type : "Posts",
            to_id : post_id,
            from_type : "PostLikes"
        };
        let result = await db.execute(notice, data);
        if(result) {
            return 1;
        }
        else {
            return -1;
        }
    }
};
