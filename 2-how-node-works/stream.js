const fs = require("fs");
const server = require("http").createServer(); // another way

server.on("request", (req, res) => {
    // Solution 1: it's not the better way because the file can be too big, and if i have mulplitle request the server crash it because the single thread will block
    // fs.readFile("test-file.txt", (error, data) => {
    //     if (error) console.log("Erro reading the file", error);
    //     res.end(data);
    // })

    // solution 2: Streams
    // const readable = fs.createReadStream("test-file.txt");

    // readable.on("data", (chunk) => {
    //     res.end(chunk);
    // })
    // readable.on("end", () => res.end()); // I need the both pieces of code because the data needs to be send
    // readable.on("error", err => {
    //     console.log(err)
    //     res.statusCode = 404
    //     res.end("File not found")
    // })

    // solution 3
    const readable = fs.createReadStream("test-file.txt");

    readable.pipe(res)

})


server.listen(9222, "0.0.0.0", () => {
    console.log("server alive nigga http://localhost:9222");
});


