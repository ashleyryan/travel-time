const cs = require('./commuteSheet.js');
const travelTime = require('./travelTime.js');

class CommuteReport {
    constructor(tokenPath, sheetId) {
        this.sheet = new cs.CommuteSheet(tokenPath, sheetId);
        this.getTravelTime = travelTime();
    }

    /**
     * Transforms an array of arrays of sheet data into an
     *  object with two properties: origins and destinations
     * @param {array} sheetData 
     */
    transformInput (sheetData) {
        let origins = [];
        let destinations = [];
        for (let r = 0; r < sheetData.length; r++) {
            origins.push(sheetData[r][0]);
            destinations.push(sheetData[r][1]);
        }
        return {origins, destinations};
    }

    transformDistanceData (resp, reportName) {
        var rows = [];
        for (let o = 0; o < resp.origin_addresses.length; o++) {
            for (let d = 0; d < resp.destination_addresses.length; d++) {
                var duration = resp.rows[o].elements[d].duration;
                var distance = resp.rows[o].elements[d].distance;
                var origin = resp.origin_addresses[o];
                var destination = resp.destination_addresses[d];
                var row = [reportName, new Date(), origin, destination,
                    distance.text, distance.value, duration.text, duration.value];

                rows.push(row);
            }
        }
        return rows;
    }


    /**
     * gets distance data for the origins and destinations in the 
     *   specified sheet name
     * @param {string} sheetName 
     */
    getCommute  (sheetName) {
        return this.sheet
            .authorize()
            .then(() => this.sheet.getAddresses(sheetName))
            .then(this.transformInput)
            .then(input =>
                this.getTravelTime(input.origins, input.destinations));
    }

    updateCommuteReport (sheetName) {
        return this.getCommute(sheetName)
            .then(dist => this.transformDistanceData(dist, sheetName))
            .then(values => this.sheet.addResultData(values))
            .then(console.log);
    }
};


module.exports = {
    CommuteReport
};
