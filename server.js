var webPush = require('web-push');
var express = require('express');
var app = express();

webPush.setGCMAPIKey('AIzaSyCNrzhY26lZC3eXaq96otA9GLllh1caOl0');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(express.static('.'))

app.post('/send', function(req, res) {
    webPush.sendNotification(req.query.endpoint, 15).then(function () {
        res.sendStatus(201);   
    }, function (err) {
        console.log(err);
        res.sendStatus(500)
    });
});

app.listen(8026);
