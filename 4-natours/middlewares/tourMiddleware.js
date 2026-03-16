exports.checkBodytour = (req, res, next) => {
  const { name, price } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'The name is requiered',
      },
    });
  }
  if (!price || price <= 0) {
    return res.status(400).json({
      status: 'fail',
      data: {
        message: 'The price must be a valid number',
      },
    });
  }

  next();
};
