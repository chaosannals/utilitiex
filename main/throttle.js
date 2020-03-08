/**
 * 节流器任务
 * 
 */
export class ThrottleTask {
    constructor() {
        this.able = true;
    }

    apply(interval) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.able) {
                    resolve();
                } else {
                    reject();
                }
            }, interval);
        });
    }
}

/**
 * 节流器。
 * 
 */
export default class Throttle {
    constructor() {
        this.time = new Date().getTime();
        this.task = new ThrottleTask();
    }

    apply(interval) {
        let now = new Date().getTime();
        let delta = now - this.time;
        if (delta > interval) {
            this.task = new ThrottleTask();
            this.time = now;
            return this.task.apply(interval);
        }
        this.task.able = false;
        this.task = new ThrottleTask();
        return this.task.apply(interval - delta);
    }
}

window.$Throttle = Throttle;
