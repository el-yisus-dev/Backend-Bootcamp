const express = require('express');

const { config } = require('../1-intro-node-js/config');
const routerAPI = require("./routes")

const app = express()

// middleware to read JSON
app.use(express.json());

// my own middleware 
app.use((req, res, next) => {

    req.requestTime = new Date().toISOString();

    console.log("Hello arount the middleware");
    
    next()
});


routerAPI(app);


app.listen(config.port, () => {
    console.log(`App running on http://localhost:${config.port}`);
})