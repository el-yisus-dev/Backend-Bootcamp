const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'The name is required'],
      min: [1, 'You need a more larger name'],
    },
    lastName: {
      type: String,
      required: [true, 'The lastname is required'],
      min: [1, 'You need a more larger name'],
    },
    email: {
      type: String,
      required: [true, 'The lastname is required'],
      unique: [true, 'This email is already register'],
    },
    username: {
      type: String,
      required: [true, 'The username is required'],
      unique: [true, 'This username is already register'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

exports.User = model('Users', userSchema);
