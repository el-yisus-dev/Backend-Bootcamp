/* eslint-disable node/no-unsupported-features/es-syntax */
const fs = require('fs');
const { Tour } = require('../models/tours');
const { default: mongoose } = require('mongoose');

const getAllTours = async (req, res) => {
  const tours = await Tour.find();

  res.json({
    status: 'success',
    requestedAt: req.requestTime, // Adding this property in a middleware at the app.js code
    result: tours.length,
    data: {
      tours,
    },
  });
};

const createTours = async (req, res) => {
  const { name, rating, price } = req.body;

  const newTour = new Tour({
    name,
    rating,
    price,
  });

  const newTourData = await newTour.save();

  res.status(201).json({
    status: 'success',
    message: 'New tour created 👍',
    data: {
      tour: newTourData,
    },
  });
};

const getTourById = async (req, res) => {
  const { id } = res.locals;

  const tour = await Tour.findOne({
    _id: id,
  });

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }

  res.json({
    status: 'success',
    data: tour,
  });
};

const updateTour = (req, res) => {
  const { id } = res.locals;

  const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/tours-simple.json`),
  );

  const tourExists = tours.find((t) => t.id === id);

  if (!tourExists) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }

  const updatedTours = tours.map((tour) =>
    tour.id === id ? { ...tour, ...req.body } : tour,
  );

  fs.writeFileSync(
    `${__dirname}/../dev-data/tours-simple.json`,
    JSON.stringify(updatedTours, null, 2),
  );

  res.status(200).json({
    status: 'success',
    data: {
      tour: updatedTours.find((t) => t.id === id),
    },
  });
};

const deleteTour = (req, res) => {
  const { id } = res.locals;

  res.status(200).json({
    status: 'success',
    data: {
      id,
      tour: null,
    },
  });
};

const checkId = (req, res, next, val) => {
  if (!mongoose.isValidObjectId(val)) {
    return res.status(400).json({
      status: 'error',
      message: 'Please introduce a valid ID',
    });
  }

  res.locals.id = val;

  next();
};

module.exports = {
  deleteTour,
  updateTour,
  getAllTours,
  getTourById,
  createTours,
  checkId,
};
