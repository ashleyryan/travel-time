const request = require('request-promise');
const querystring = require('querystring');

const GM_ENDPOINT = 'https://maps.googleapis.com/maps/api/distancematrix/json';

const validateResponse = (resp) => {
    return resp.status !== 'OK'
        ? Promise.reject('Invalid Status: ' + resp.status)
        : resp;
};

const travelTimes = (options) => {
    options = options || {};
    options.units = options.units || 'imperial';
    options.apiKey = options.apiKey || null;

    return function getDistance(origins, destinations) {
        origins = Array.isArray(origins) ? origins : [origins];
        destinations = Array.isArray(destinations) ? destinations : [destinations];
        const qs = {
            units: options.units,
            key: options.apiKey,
            origins: origins.join('|'),
            destinations: destinations.join('|')
        };
        const url = `${GM_ENDPOINT}?${querystring.stringify(qs)}`;
        return request(url)
            .then(JSON.parse)
            .then(validateResponse);
    };
};

module.exports = travelTimes;
