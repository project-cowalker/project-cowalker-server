const recruit = require('../model/schema/recruit');

var now = new Date();

module.exports = {
	elapsedTime : function(createTime) {
      const create = createTime;
      
      var msecPerMinute = 1000 * 60;
      var msecPerHour = msecPerMinute * 60;
      var msecPerDay = msecPerHour * 24;

	  	var gap = now.getTime()-create.getTime();
      var calculateTime = Math.floor(gap / 1000);
      var elapsed = '방금';

     	
    	if(calculateTime > 60){
        calculateTime = Math.floor(gap / msecPerMinute);
        elapsed = calculateTime + '분 전';
        
        if(calculateTime > 60){
          calculateTime = Math.floor(gap / msecPerHour);
          elapsed = calculateTime + '시간 전';

          if(calculateTime > 60){
            calculateTime = Math.floor(gap / msecPerDay);
            elapsed = calculateTime + '일 전';
          }
        }
      }

      //console.log(elapsed);
    	return elapsed;
	}
};
