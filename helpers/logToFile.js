/**====================================================== 
 * logToFile.js
 * Purpose: Provides a simple log-to-file function for use across the application.
 * Author: Dane Rainbird (me@danerainbird.me)
 ====================================================== */
 
let fs = require('fs');

/** 
 * Helper function to log messages to log.txt
 * 
 * @param {string} ip - The IP address of the client
 * @param {string} status - The status of the request
 * @param {string} message - The message to log
*/
let log = (ip, status, message) => {
    // Write log to file in format of: Date - IP - Action - Message
    fs.appendFile('log.txt', `${new Date().toISOString()} - ${ip} - ${status} - ${message}\n`, (err) => {
        if (err) throw err;
    });
}

module.exports = log;