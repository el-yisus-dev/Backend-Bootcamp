const { User } = require('../models/users');

exports.getAllUsers = async (req, res) => {
  res.status(200).json({
    message: 'success',
    data: {
      message: 'users baby.....',
    },
  });
};

exports.createUser = async (req, res) => {
  const { name, lastName, email, username } = req.body;
  try {
    const newUser = new User({
      name,
      lastName,
      email,
      username,
    });

    await newUser.save();

    res.status(200).json({
      message: 'success',
      data: {
        newUser,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;

  res.status(200).json({
    message: 'success',
    data: {
      message: 'users baby.....',
      id,
    },
  });
};

exports.updateUser = async (req, res) => {
  res.status(200).json({
    message: 'success',
    data: {
      message: 'users baby.....',
    },
  });
};

exports.deleteUser = async (req, res) => {
  res.status(200).json({
    message: 'success',
    data: {
      message: 'users baby.....',
    },
  });
};
