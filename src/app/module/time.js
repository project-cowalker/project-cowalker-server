const recruit = require('../model/schema/recruit');

let now = new Date();

module.exports = {
  elapsedTime: function (createTime) {
    const create = createTime;

    let msecPerMinute = 1000 * 60;
    let msecPerHour = msecPerMinute * 60;
    let msecPerDay = msecPerHour * 24;

    let gap = now.getTime() - create.getTime();
    let calculateTime = Math.floor(gap / 1000);
    let elapsed = '방금';


    if (calculateTime > 60) {
      calculateTime = Math.floor(gap / msecPerMinute);
      elapsed = calculateTime + '분 전';

      if (calculateTime > 60) {
        calculateTime = Math.floor(gap / msecPerHour);
        elapsed = calculateTime + '시간 전';

        if (calculateTime > 60) {
          calculateTime = Math.floor(gap / msecPerDay);
          elapsed = calculateTime + '일 전';
        }
      }
    }

    return elapsed;
  }
};
