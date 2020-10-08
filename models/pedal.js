const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedalSchema = new Schema(
  {
    make: String,
    model: String,
    type: String,
    serial: String,
    hasFXLoop: Boolean,
    year: String,
    inFXLoop: Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Pedal', pedalSchema);
