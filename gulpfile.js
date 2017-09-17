const gulp = require('gulp');
const travelTime = require('./src/travelTime.js');
const commuteReport = require('./src/commuteReport');

const SHEET_ID = '1rlB7pSiUVL58eLKxGZc5VmFQgqtJ36Fcar41Hb94ji0';
const CLIENT_SECRET_PATH = "client_secret.json";

gulp.task('distance', () => {
    return travelTime()("Boston", "New York City");
});

gulp.task('sheets', () => {
    return new commuteReport.CommuteReport(CLIENT_SECRET_PATH, SHEET_ID)
        .getCommute('AMReport')
        .then((resp) => {
            for(let o = 0; o < resp.origin_addresses.length; o++) {
                for(let d = 0; d < resp.destination_addresses.length; d++) {
                    var duration = resp.rows[o].elements[d].duration;
                    console.log("Origin: " + resp.origin_addresses[o]);
                    console.log("Destination: " + resp.destination_addresses[d]);
                    console.log(duration);
                }
            }
        });
});

