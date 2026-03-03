const { Router } = require("express");

const fs = require("fs");
const { getAllTours, createTours, getTourById, updateTour, deleteTour } = require("../controllers/tours");


const router = Router()

// Another way to handle the methods and controllers
router.get("/", getAllTours)
  .post("/", createTours)
  .get("/:id", getTourById)
  .patch("/:id", updateTour)
  .delete("/:id", deleteTour)

module.exports = router