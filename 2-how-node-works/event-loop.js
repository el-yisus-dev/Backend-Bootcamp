process.env.UV_THREADPOOL_SIZE = 5; // debe establecerse antes de que se cargue cualquier módulo que use el thread pool

const fs = require("fs");
const crypto = require("crypto");

const date = Date.now();



setTimeout(() => {
    console.log("timer 1 in the console");
    
}, 0);

setImmediate(() => {
    console.log("Set immediate 1 in the console");
});


fs.readFile('test-file.txt', () => {
    console.log("I/O finished");

    console.log("-----------------");
    // under are the callbacks that are running in the event loop
    setTimeout(() => {
        console.log("timer 2 in the console");
    }, 0);
    setTimeout(() => {
        console.log("timer 3 in the console");
    }, 3000);

    setImmediate(() => {
        console.log("Set immediate 2 in the console");
    });

    process.nextTick(()=>console.log("next tick baby"))

    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - date,"Password encrypted");
        
    })
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - date,"Password encrypted");
        
    })
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - date,"Password encrypted");
        
    })
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - date,"Password encrypted");
        
    })
    crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
        console.log(Date.now() - date,"Password encrypted");
        
    })
});

console.log("Hello from top level code");
