const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("newSale");
});

myEmitter.on("newSale", () => {
  console.log("other new sale");
});

myEmitter.on("newSale", stock => {
  console.log("And other new sale with stock - " + stock);
});

myEmitter.emit("newSale", 9);

///////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!");

  res.end("Request received!");
});

server.on("request", (req, res) => {
  console.log("Request received!");

  res.end("Another Request received!");
});

server.on("close", () => {
  console.log("Server close");
});

server.listen(3000, () => {
  console.log("Waiting for requests...");
});
