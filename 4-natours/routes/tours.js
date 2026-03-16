const { Router } = require('express');

const {
  getAllTours,
  createTours,
  getTourById,
  updateTour,
  deleteTour,
  checkId,
} = require('../controllers/tours');
const { checkBodytour } = require('../middlewares/tourMiddleware');

const router = Router();

// Using a param middleware
// In long apis, this method is rarely used, better we use zod .get("/:id", validateId, getTourById)
router.param('id', checkId);

// Another way to handle the methods and controllers
router
  .get('/', getAllTours)
  .post('/', checkBodytour, createTours)
  .get('/:id', getTourById)
  .patch('/:id', updateTour)
  .delete('/:id', deleteTour);

module.exports = router;
