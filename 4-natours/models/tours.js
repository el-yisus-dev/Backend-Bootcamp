const { Schema, model } = require('mongoose');

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: [true, 'this name already exists'],
    },
    rating: {
      type: Number,
      default: 3.5,
    },
    price: {
      type: Number,
      min: [0.1, 'The can not be 0'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

exports.Tour = model('Tour', tourSchema);
