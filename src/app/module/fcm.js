const db = require('../module/pool.js');
const FCM = require('fcm-node');
const fcmserverkey=require('../../config/fcmserverkey').key;
const fcm = new FCM(fcmserverkey);

module.exports = {

	fcmSend : async(...args) => {

    let user_idx=args[0];
    let projet_name=args[1];
    let msg=args[2];
    console.log(user_idx);
    // fcm_token 조회
    let fcmTokenQuery='select fcm_token from USER where user_idx=?'
    let fcmTokenResult= await db.execute2(fcmTokenQuery, user_idx);

     /** 발송할 Push 메시지 내용 */
    var client_token = fcmTokenResult[0].fcm_token;
    console.log(client_token);

    var push_data = {
      
    // 수신대상
      to: client_token,

    // App이 실행중이지 않을 때 상태바 알림으로 등록할 내용
      notification: {
        title: project_name,
        body: msg,
        sound: "default",
        click_action: "FCM_PLUGIN_ACTIVITY"
      },

    // 메시지 중요도
    priority: "high",
    // App 패키지 이름
    restricted_package_name: "com.jemcom.cowalker",
    
    // data:{
    //   title: project_name,
    //   body:msg
    // }

  };

  fcm.send(push_data, function(err, response) {
    
    if (err) {
        console.error('Push메시지 발송에 실패했습니다.');
        console.error(err);
        return -1;
    }
 
    console.log('Push메시지가 발송되었습니다.');
    // console.log(response);


  });

  return;
}
}