const { Schema, model } = require('mongoose');

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: [true, 'this name already exists'],
    },
    rating: {
      type: String,
    },
    price: {
      type: String,
      min: [0.1, 'The cannot be 0'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

exports.Tour = model('Tour', tourSchema);
