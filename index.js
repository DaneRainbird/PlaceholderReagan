/**====================================================== 
 * index.js
 * Purpose: Main entry point for the application.
 * Author: Dane Rainbird (me@danerainbird.me)
 ====================================================== */

 /** DEPENDENCIES **/
 let express = require('express');
 let log = require('./helpers/logToFile');

 require('dotenv').config();

 /** APP CONFIGURATION **/
let app = express();
let port = process.env.PORT || 8080;
const verbose = process.env.VERBOSE || false;
const loggingEnabled = process.env.LOGGING_ENABLED || false;

/** STATIC ROUTING CONFIGURATION **/
app.use(express.static('res'));

/** LOGGING MIDDLEWARE */
app.use((req, res, next) => {
    if (loggingEnabled) {
        log(req.ip, req.method, req.url);
    }
    next();
});

/** ROUTER FILE */
app.use('/', require('./router'));

/** RUN THE SERVER */
app.listen(port, () => console.log("Listening on port " + port));