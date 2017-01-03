var express = require('express');
var app = express();
var fs = require("fs");
var path = require("path");

// todo
// show folder path in url
// separate player from folder list
// allow navigation while playing
// play all contents in folder
// allow playing prev and next track

app.get("/audio/:id", (req, res) => {
  var file = new Buffer(req.params.id, 'base64').toString();
  fs.stat(file, (err, stats) => {
    var range = req.headers.range;
    if (!range) {
      // 416 Wrong range
      res.sendStatus(416);
    }
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
  })
});




app.get("/dir/:id*?", (req, res) => {
  var dirPath = req.params.id ? new Buffer(req.params.id, 'base64').toString() : "/";
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
  })
});

// app.get("/dir/:id*?", (req, res) => {
//   console.log('id', req.params.id);
//   var dirPath = req.params.id ? new Buffer(req.params.id, 'base64').toString() : "/";
//   console.log('dirpath', dirPath);
//   fs.stat(dirPath, (err, stats) => {
//     fs.readdir(dirPath, (err, files) => {
//       res.send(files.map((f) => {
//         var filePath = path.join(dirPath, f);
//         console.log('filePath', filePath);
//         var stats = fs.statSync(filePath);
//         return {
//           file: f,
//           isDirectory: stats.isDirectory(),
//           path: filePath,
//           id: new Buffer(filePath).toString('base64')
//         };
//       }));
//     });
//   })
// });

app.listen(3001, function () {
  console.log('Listening on port 3001!');
});