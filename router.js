/**====================================================== 
 * router.js
 * Purpose: Router file for the application.
 * Author: Dane Rainbird (me@danerainbird.me)
 ====================================================== */

let express = require('express')
let log = require('./helpers/logToFile');
let fs = require('fs');
let resizeImage = require('resize-image-buffer');
require('dotenv').config();
let app = express.Router();

const verbose = process.env.VERBOSE || false;
const loggingEnabled = process.env.LOGGING_ENABLED || false;

// GET - favicon
app.get('/favicon.ico', (req, res) => {
    res.sendFile(fs.readFileSync('./res/favicon.ico'));
});

// GET - Homepage (/)
app.get('/', (req, res) => {
    res.json({
        status: 200,
        message: 'Visit /image/width/height to get a resized image.'
    })
}) 

// GET - Image (/image/:width/:height)
app.get('/image/:width/:height', async (req, res) => {

    // Ensure the provided dimensions are reasonable (i.e. not too large)
    if (parseInt(req.params.width) > 4096 || parseInt(req.params.height) > 4096) {
        log(req.ip, 'GET', 'ERROR: Image dimensions too large (' + req.params.width + 'x' + req.params.height + ').');
        return res.status(400).json({
            status: 400,
            message: 'Image dimensions must be less than 4096px.'
        });
    } 

    // Ensure that the provided dimensions are greater than 0 (i.e. not too small)
    if (parseInt(req.params.width) < 1 || parseInt(req.params.height) < 1) {
        log(req.ip, 'GET', 'ERROR: Image dimensions too small (' + req.params.width + 'x' + req.params.height + ').');
        return res.status(400).json({
            status: 400,
            message: 'Image dimensions must be greater than 0px.'
        });
    }

    // Check if the provided dimensions are actually numbers
    if (isNaN(parseInt(req.params.width)) || isNaN(parseInt(req.params.height))) {
        log(req.ip, 'GET', 'ERROR: Image dimensions non-numeric (' + req.params.width + '_' + req.params.height + ').');
        return res.status(400).json({
            status: 400,
            message: 'Image dimensions must be numbers.'
        });
    }

    // Get a random image from the images folder and resize it to the specified width and height
    let images = fs.readdirSync('res/images');
    let selectedImage = images[Math.floor(Math.random() * images.length)];
    let imagePath = '/res/images/' + selectedImage;
    let imageFile = fs.readFileSync(__dirname + imagePath);
    
    // Write to console if verbose enabled
    if (verbose) {
        console.log("Resizing image: " + imagePath + " to " + req.params.width + "x" + req.params.height);
    }

    // Resize the image 
    const image = await resizeImage(imageFile, {
        width: parseInt(req.params.width),
        height: parseInt(req.params.height)
    });

    // Write the image to disk 
    let newFileName = selectedImage + '-' + req.params.width + '-' + req.params.height + '.png';
    let newFilePath = __dirname + '/res/images/' + newFileName;
    fs.writeFileSync(newFilePath, image);

    // Send the image back to the client, and delete after sending
    res.sendFile(newFilePath, (err) => {
        if (err) {
            log(req.ip, 'GET', 'ERROR: Unable to send image to client: ' + err);
            return res.json({'error': err});
        }
        fs.unlinkSync(newFilePath);
    });
    
});

// GET - Fallback route
app.get('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'Method not found.'
    });
});

module.exports = app;