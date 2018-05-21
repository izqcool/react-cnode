
export class Helpers {
    static dateFromNow(strDate) {
        const strTime = strDate;
        //以秒为单位的时间戳
        const oldTamp = Date.parse(new Date(strTime))/1000;
        const now = new Date();
        const nowTamp = Date.parse(now)/1000;
        const distanceTime = nowTamp - oldTamp;

        if(distanceTime>=0 && distanceTime < 60) {
            return `${distanceTime} seconds age`;
        }
        if(distanceTime>=60 && distanceTime < 3600 ) {
            const min = Math.floor(distanceTime/60);
            if(min>1) {
                return `${min} minutes age`;
            }else {
                return `${min} minute age`;
            }

        }

        if(distanceTime>=3600 && distanceTime < 3600*24 ) {
            const hour = Math.floor(distanceTime/3600);
            if(hour>1) {
                return `${hour} hours age`;
            }else {
                return `${hour} hour age`;
            }
        }

        if(distanceTime>=3600*24 ) {
            const day = Math.floor(distanceTime/(3600*24));
            if(day>1) {
                return `${day} days age`;
            }else {
                return `${day} day age`;
            }
        }

    }

    static isScorllDown() {
        const bodyScrollTop = !!document.body ? document.body.scrollTop : 0;
        const documentScrollTop = !!document.documentElement ? document.documentElement.scrollTop : document.documentElement;
        const scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;

        const bodyScrollHeight = !!document.body ? document.body.scrollHeight : 0;
        const documentScrollHeight = !!document.documentElement ? document.documentElement.scrollHeight : 0;
        const scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;

        const windowHeight = document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight;
        if(scrollHeight - scrollTop - windowHeight === 0) {
            return true;
        }else {
            return false;
        }
    }
}