const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chainSchema = new Schema(
  {
    name: String,
    pedals: [{ type: Schema.Types.ObjectId, ref: 'Pedal' }],
    // user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const rigSchema = new Schema(
  {
    name: { type: String, required: true },
    hasFXLoop: Boolean,
    // chains: [{ type: Schema.Types.ObjectId, ref: 'Chain' }],
    chains: [chainSchema],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Rig', rigSchema);
