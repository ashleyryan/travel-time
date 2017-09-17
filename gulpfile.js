const gulp = require('gulp');
const travelTime = require('./src/travelTime.js');
const commuteReport = require('./src/commuteReport');

const SHEET_ID = '1rlB7pSiUVL58eLKxGZc5VmFQgqtJ36Fcar41Hb94ji0';
const CLIENT_SECRET_PATH = 'client_secret.json';

gulp.task('distance', () => {
    return travelTime()('Boston', 'New York City');
});

gulp.task('record:AM', () => {
    return new commuteReport.CommuteReport(CLIENT_SECRET_PATH, SHEET_ID)
        .updateCommuteReport('AMReport');
});

gulp.task('record:PM', () => {
    return new commuteReport.CommuteReport(CLIENT_SECRET_PATH, SHEET_ID)
        .updateCommuteReport('PMReport');
});

