const { Router } = require("express");

const routerTours = require("./tours");

const routerAPI = app => {
    const router = Router()
    
    app.get('/', (req, res) => {
        res.json({ message: 'Jala la app master' })
    })
    
    app.use("/api/v1/", router);

    router.use("/tours", routerTours)
}

module.exports = routerAPI;
