/* eslint-disable node/no-unsupported-features/es-syntax */
const { default: mongoose } = require('mongoose');
const { Tour } = require('../models/tours');

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
  try {
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
  } catch (error) {
    res.status(400).json({
      message: 'A error ocurred',
    });
  }
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

const updateTour = async (req, res) => {
  const { id } = res.locals;

  const { name, rating, price } = req.body;

  const tour = await Tour.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      name,
      rating,
      price,
    },
  );

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Tour updated successfully',
  });
};

const deleteTour = async (req, res) => {
  const { id } = res.locals;
  await Tour.findByIdAndDelete(id);

  res.status(200).json({
    status: 'success',
    message: 'Tour deleted',
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
