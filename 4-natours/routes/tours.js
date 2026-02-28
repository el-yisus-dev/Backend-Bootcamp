const { Router } = require("express");

const fs = require("fs");


const router = Router()


router.get("/", (req, res) => {
    
    const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/tours-simple.json`));
    
    res.json({
        status: "success",
        results: tours.length,
        data: {
            tours
        }
    })
})

router.post("/", (req, res) => {
  const {
    name,
    duration,
    maxGroupSize,
    difficulty,
    ratingsAverage,
    ratingsQuantity,
    price,
    summary,
    description,
    imageCover,
    images,
    startDates
  } = req.body;

  const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/tours-simple.json`)
  );

  const newTour = {
    id: tours[tours.length - 1].id + 1,
    name,
    duration,
    maxGroupSize,
    difficulty,
    ratingsAverage,
    ratingsQuantity,
    price,
    summary,
    description,
    imageCover,
    images,
    startDates
  };

  const newData = [...tours, newTour];
  
  fs.writeFileSync(
    `${__dirname}/../dev-data/tours-simple.json`,
    JSON.stringify(newData, null, 2)
  );

  res.status(201).json({
        status: "success",
        message: "New tour created 👍",
        data: {
            tour: newData
        }
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const idNum = id * 1;

  if (isNaN(idNum)) {
    return res.status(400).json({
      status: "error",
      message: "Please introduce a valid ID"
    });
  }

  const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/tours-simple.json`)).find(element => element.id === idNum);

  if (!tours) {
    return res.status(404).json({
      status: "fail",
      message: "Tour not found"
    });
  }

  res.json({
    status: "success",
    data: {
      ...tours
    }
  });
});

router.patch("/:id", (req, res) => {

  const { id } = req.params;
  const idNum = id * 1;

  if (isNaN(idNum)) {
    return res.status(400).json({
      status: "error",
      message: "Please introduce a valid ID"
    });
  }

  const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/tours-simple.json`)
  );

  const tourExists = tours.find(t => t.id === idNum);

  if (!tourExists) {
    return res.status(404).json({
      status: "fail",
      message: "Tour not found"
    });
  }

  const updatedTours = tours.map(tour =>
    tour.id === idNum ? { ...tour, ...req.body } : tour
  );

  fs.writeFileSync(
    `${__dirname}/../dev-data/tours-simple.json`,
    JSON.stringify(updatedTours, null, 2)
  );

  res.status(200).json({
    status: "success",
    data: {
      tour: updatedTours.find(t => t.id === idNum)
    }
  });

});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  
  if(!id) {
    res.status(400).json({
      status: "fail",
      message: "Invalid Id"
    })
    return;
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: null
    }
  });
});

module.exports = router