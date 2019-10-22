const fs = require("fs");
const server = require("http").createServer();
const path = require("path");

server.on("request", (req, res) => {
  //Solution 1
  const pathToDataDir = path.resolve(__dirname, "..", "data");

  //console.log(pathToDataDir + "/bigData.txt");

  /* fs.readFile(pathToDataDir + "/bigData.txt", (err, data) => {
    if (err) console.log(err);
    res.end(data);
  }); */

  //Solution 2: Streams
  /* const readable = fs.createReadStream(pathToDataDir + "/bigData.txt");
  readable.on("data", chunk => {
    res.write(chunk);
  });

  readable.on("end", () => {
    res.end();
  });

  readable.on("error", err => {
    console.log(err);
    res.statusCode = 500;
    res.end("File not found");
  }); */

  //Solution 3:
  //file stream is much faster than response stream and it makes backpressure
  //method pipe make speeds equals
  const readable = fs.createReadStream(pathToDataDir + "/bigData.txt");
  readable.pipe(res);
});

server.listen(3000, () => console.log("Listening 3000"));
