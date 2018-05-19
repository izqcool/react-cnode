import formatDate from 'date-fns';

export class Helpers {
    static dateFromNow(strDate) {
        const strTime = strDate;
        //以秒为单位的时间戳
        const oldTamp = Date.parse(new Date(stringTime))/1000;
        const now = new Date();
        const nowTamp = Date.parse(now)/1000;
        const distanceTime = oldTamp - nowTamp;

        if(distanceTime>=0 && distanceTime <= 60) {
            return `${distanceTime}秒前`;
        }

    }
}