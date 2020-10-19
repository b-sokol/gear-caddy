const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chainSchema = new Schema(
  {
    name: String,
    pedals: [{ type: Schema.Types.ObjectId, ref: 'Pedal' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Chain', chainSchema);
