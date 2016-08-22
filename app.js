/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
var bodyParser = require('body-parser');
var firebase = require("firebase");

// create a new express server
var app = express();
// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing       application/x-www-form-urlencoded

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


firebase.initializeApp({
  serviceAccount: "credentials/filo2016-bbe4f54baca2.json",
  databaseURL: "https://filo2016-dd70d.firebaseio.com/"
});
var db = firebase.database();
var ref = db.ref("data");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
app.post('/sendresp', (req, res) => {
  const data = req.body;
  console.log(data);
  res.sendStatus(200);
});
