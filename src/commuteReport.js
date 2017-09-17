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
};


module.exports = {
    CommuteReport
};
