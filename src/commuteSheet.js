const google = require('googleapis');
const {authorizeFromFile} = require('./sheetsAuth.js');

class CommuteSheet {
    constructor (clientSecretPath, sheetId) {
        this.clientSecretPath = clientSecretPath;
        this.sheetId = sheetId;

    }

    authorize() {
        return authorizeFromFile(this.clientSecretPath)
            .then(auth => this.auth = auth);
    }

    getAddresses(sheetName) {
        return new Promise((resolve, reject) => {
            var sheets = google.sheets('v4');
            sheets.spreadsheets.values.get({
                auth: this.auth,
                spreadsheetId: this.sheetId,
                range: sheetName + '!A2:B',
            }, function(err, response) {
                if (err) {
                    reject('The API returned an error: ' + err);
                    return;
                }
                var rows = response.values;
                if (rows.length === 0) {
                    reject('No data found.');
                    return;
                } else {
                    resolve(rows);
                }
              });
        });
    }

    addResultData(rows) {
        return new Promise((resolve, reject) => {
            var request = {
                auth: this.auth,
                spreadsheetId: this.sheetId,
                range: 'Results!A1:H',
                valueInputOption: 'RAW',
                insertDataOption: 'INSERT_ROWS',
                resource: {
                    values: rows
                }
                
            };

            var sheets = google.sheets('v4');
            sheets.spreadsheets.values.append(request, function(err, response) {
                if (err) {
                    reject('The API returned an error: ' + err);
                    return;
                }
                resolve(response);
            });
        });
    }

}


module.exports = {
    CommuteSheet
};
