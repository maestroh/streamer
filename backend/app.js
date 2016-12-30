var express = require('express');
var app = express();
var fs = require("fs");
var path = require("path");
var Leaky = require("./leaky.js");


// To do:
// Replace statSync with stat
// don't pass res into functions

app.get("*", (req, res) => {
  console.log("req.path", req.path);
  var param = decodeURI(req.path);
  console.log(param);
  var pathStats = fs.statSync(param);
  if (pathStats.isDirectory()) {
    getDirectoryContent(param, res);
  } else {
    getAudio2(param, pathStats.size, req, res);
  }
});

function getAudio2(file, size, req, res) {
  console.log('headers',req.headers);
  var range = req.headers.range;
  if (!range) {
    // 416 Wrong range
    res.sendStatus(416);
  }
  var positions = range.replace(/bytes=/, "").split("-");
  var start = parseInt(positions[0], 10);
  var end = positions[1] ? parseInt(positions[1], 10) : size - 1;
  var chunksize = (end - start) + 1;

  res.writeHead(206, {
    "Content-Range": "bytes " + start + "-" + end + "/" + size,
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

}

function getAudio(file, size, res) {
  res.writeHead(200, {
    'Content-Type': 'audio/mp3',
    'Content-Length': size
  });
  var readStream = fs.createReadStream(file);
  readStream.pipe(res);
}

function getDirectoryContent(directory, res) {
  fs.readdir(directory, (err, files) => {
    res.send(files.map((f) => {
      var filePath = path.join(directory, f);
      var stats = fs.statSync(filePath);
      return {
        file: f,
        isDirectory: stats.isDirectory(),
        path: filePath
      };
    }));
  });
}

app.listen(3001, function () {
  console.log('Listening on port 3001!');
});