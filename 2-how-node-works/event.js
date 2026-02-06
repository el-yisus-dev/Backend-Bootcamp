const EventEmitter = require("events");
const http = require("http");


class Sales extends EventEmitter {
    constructor(){
        super()
    }
}
// class Sales extends EventEmitter {} Do the same here, JS work in a implicit way


const myEmitter = new Sales()

myEmitter.on("newSale", () => {
    console.log("there was a new sale!!");
})

myEmitter.on("newSale", ({name}) => {
    console.log(`The customer name was ${name}`);
}) // I can set multiple emitters from the same event

myEmitter.on("newSale", ({number}) => {
    console.log(`The are now ${number} items left in stock`);
}) // I can set multiple emitters from the same event

myEmitter.emit("newSale", { name: "Jesús Antonio", number: 2 });

/////////////////////////////

const server = http.createServer()

server.on('request', (req, res) => {
    console.log("Request received");
    console.log(req.url);
    
    res.end("<h1>Request received nigga</h1>");
})

server.on('request', (req, res) => {
    console.log("Another Request received");
})

server.on('close', (req, res) => {
    console.log("Y se marcho y a ese barco le llamo libertad");
})


server.listen(9222, "0.0.0.0", () => {
    console.log("Waiting from work baby")
})