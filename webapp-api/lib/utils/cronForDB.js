const cron = require('cron');
const request = require('request');

let job1 = new cron.CronJob({
    cronTime: '*/5 * * * * *',
    onTick: function() {
        console.log('job 1 ticked');

        request('http://localhost:5000/messages', function (error, response, body) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('body:', body); // Print the HTML for the Google homepage.
        });
    },
    start: false
});

const startJob = (cb) => {
    job1.start();
    cb();
};

module.exports = {
    startJob
};