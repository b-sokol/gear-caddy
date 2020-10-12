const mongoose = require('mongoose');

const pedalSchema = new mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    type: { type: String, required: true },
    serial: String,
    year: String,
    hasFXLoop: Boolean,
    inFXLoop: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Pedal', pedalSchema);
