const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pedalSchema = new Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    type: { type: String, required: true },
    serial: String,
    year: String,
    // hasFXLoop: Boolean,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Pedal', pedalSchema);
