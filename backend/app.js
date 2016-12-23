var express = require('express');
var app = express();
var fs = require("fs");
var path = require("path");
var Leaky = require("./leaky.js");

app.get("*", (req, res) => {
    console.log("req.path", req.path);
    var param = decodeURI(req.path);
    console.log(param);
    var pathStats = fs.statSync(param);
    if (pathStats.isDirectory()) {
        fs.readdir(param, (err, files) => {
            // for each file, is dir or file?
            res.send(files.map((f) => {
                var filePath = path.join(param, f);
                var stats = fs.statSync(filePath);
                return { 
                    file: f, 
                    isDirectory: stats.isDirectory(),
                    path: filePath
                };
            }));
        });
    } else {
        res.writeHead(200, {
            'Content-Type': 'audio/mp3',
            'Content-Length': pathStats.size
        });
        var readStream = fs.createReadStream(param);
        readStream.pipe(new Leaky()).pipe(res);
    }
});

app.listen(3001, function () {
    console.log('Listening on port 3001!');
});