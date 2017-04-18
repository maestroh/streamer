#!/usr/bin/env node
var express = require('express');
var app = express();
var fs = require("fs");
var path = require("path");
var readline = require("readline");

app.get("/api/audio/:id", (req, res) => {
  var file = new Buffer(req.params.id, 'base64').toString();
  fs.stat(file, (err, stats) => {
    var range = req.headers.range;
    if (range) {
      var positions = range.replace(/bytes=/, "").split("-");
      var start = parseInt(positions[0], 10);
      var end = positions[1] ? parseInt(positions[1], 10) : stats.size - 1;
      var chunksize = (end - start) + 1;

      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + stats.size,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "audio/mp3"
      });

      var stream = fs.createReadStream(file, { start: start, end: end })
        .on("open", function () {
          stream.pipe(res);
        }).on("error", function (err) {
          res.end(err);
        });
    }else{
      res.writeHead(200, {
        "Content-Length": stats.size,
        "Content-Type": "audio/mp3"
      });

      var stream = fs.createReadStream(file)
        .on("open", function () {
          stream.pipe(res);
        }).on("error", function (err) {
          res.end(err);
        });
    }
  })
});

app.get("/api/dir/:id*?", (req, res) => {
  if (!req.params.id) {
    let lines = [];
    let rl = readline.createInterface({
      input: fs.createReadStream(path.join(__dirname, "streamer.config"))
    });

    rl.on('line', (line) => {
      lines.push({
        file: line,
        isDirectory: true,
        path: line,
        id: new Buffer(line).toString('base64')
      });
    });

    rl.on('close', () => {

      res.send(lines);
    });
  } else {
    var dirPath = new Buffer(req.params.id, 'base64').toString();
    fs.readdir(dirPath, (err, files) => {
      res.send(files.map((f) => {
        var filePath = path.join(dirPath, f);
        var stats = fs.statSync(filePath);
        return {
          file: f,
          isDirectory: stats.isDirectory(),
          path: filePath,
          id: new Buffer(filePath).toString('base64')
        };
      }));
    });
  }
});

app.use(express.static(path.join(__dirname, 'build')));

app.listen(3001, function () {
  console.log('Listening on port 3001!');
});