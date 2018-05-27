const MessageService = require("../people/messageService");

const cron = require('cron');

let job1 = new cron.CronJob({
    cronTime: '*/5 * * * * *',
    onTick: MessageService.retrieveAll,
    start: false
});

const startJob = (cb) => {
    job1.start();
    cb();
};

module.exports = {
    startJob
};