# Placeholder Reagan
A site that lets you pass a resolution and returns a random image of Ronald Reagan in that resolution.

## Setup / Running
- Run `npm install` to download the required dependencies.
- Create a file named `.env` and create a key called PORT, which the app will run at (defaults to 8080).
- Run `node .\index.js` and navigate to `localhost:8080`, or whichever port you chose.

You can also optionally configure the below settings from the `.env` file:
| Setting     | Description | Expected Value |
| ----------- | ----------- | ----------- |
| VERBOSE      | If verbose console logging should be turned on       | Boolean       |
| LOGGING_ENABLED   | If an output log should be generated        | Boolean       |

## Usage
Once up and running, visit the endpoint `/image/width/height`, where `width` and `height` are integers that are greater than 0 and less than or equal to 4096.

An example image, generated from the endpoint `/image/150/150` can be seen below (please note this may take a while to load as the image has to be generated):
<p align="center">
  <img width="150" height="150" src="https://placeholderreagan.onrender.com/image/150/150">
</p>

You can check it out live [here!](https://placeholderreagan.onrender.com/)

## Modifying the Results
If you wish to change the potential results that can be generated (i.e. which iamges are used), you can edit or replace the files within the `res/images` directory. 
