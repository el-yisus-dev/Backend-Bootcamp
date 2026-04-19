const { default: mongoose } = require('mongoose');
const { User } = require('../models/users');

exports.getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    message: 'success',
    data: {
      users,
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

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid id',
    });
  }

  const user = await User.findById(id);

  res.status(200).json({
    message: 'success',
    data: {
      user,
    },
  });
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  const { name, lastName, username, email } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid id',
    });
  }

  await User.findByIdAndUpdate(id, {
    name,
    lastName,
    username,
    email,
  });

  res.status(200).json({
    message: 'success',
    data: {
      message: 'user updated successfully',
    },
  });
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({
      status: 'error',
      message: 'Invalid id',
    });
  }

  await User.findByIdAndDelete(id);

  res.status(200).json({
    message: 'success',
    data: {
      message: 'users deleted successfully',
    },
  });
};
