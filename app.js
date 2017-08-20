// npm packages brought in by nodejs for this project
const useragent = require('express-useragent');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
const os = require('os');

module.exports = app;
// initializing the bodyParser middleware for JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// assigns the port for the server
const port = process.env.PORT || 3000;
// cors middleware for cross origin requests
app.use(cors());
app.use(useragent.express());
// looks in public and Css folders for our static files
app.use(express.static('public'));
app.use(express.static('css'));

let sysInfo = {
  ip: os.networkInterfaces()
, name: os.hostname()
, platform: os.platform()
, arch: os.arch()
}

// route for homepage or '/'
app.get('/', (req,res) => {
    res.send('This is the HomePage and I think there is a problem with the Index.html');
});
// route for system page or /system
app.get('/system', (req,res,next) => {
  var hasToShowVK = req.acceptsLanguages( 'en','en-us', 'ru', 'uk', 'ru-mo', 'be' );
  for (var i in sysInfo.ip) {
    res.json({
      ip: sysInfo.ip[i][1].address
    , language: hasToShowVK
    , computer: sysInfo.name
    , operatingSystem: req.useragent.os
    , browser: req.useragent.browser
    , platform: sysInfo.platform
    , architecture: sysInfo.arch
    });
    // must return before calling next to avoid a header error
    return;
    next();
  }
});

// tells express app to listen at a specified port
app.listen(port, (err, res) => {
  console.log('The server is running on port: ' + port);
});
