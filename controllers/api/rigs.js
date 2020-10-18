const Rig = require('../../models/rig');
const Chain = require('../../models/chain');
const Pedal = require('../../models/pedal');
const User = require('../../models/User');
const { deleteOne } = require('../../models/pedal');

module.exports = {
  index,
  create,
  show,
  update,
  delete: deleteRig,
};

async function index(req, res) {
  try {
    const rigs = await Rig.find({user: req.user._id});
    res.status(200).json(rigs);
  } catch (err) {
    res.status(404).json(err);
  }
}

async function create(req, res) {
  try {
    const rig = await Rig.create(req.body);
    const pedals = await Pedal.find({ user: req.user._id });
    const unusedChain = new Chain({ name: 'Unused', pedals: pedals });
    const mainChain = new Chain({ name: 'Main', pedals: [] });
    rig.user = req.user._id;
    rig.chains.push(unusedChain, mainChain);
    if (rig.hasFXLoop) {
      const fxChain = new Chain({ name: 'FX Loop', pedals: [] });
      rig.chains.push(fxChain);
    }
    rig.save();
    res.status(201).json(rig);
  } catch (err) {
    res.status(404).json(err);
  }
}

async function show(req, res) {
  try {
    const rig = await Rig.findById(req.params.id);
    res.status(200).json(rig);
  } catch (err) {
    res.status(404).json(err);
  }
}

async function update(req, res) {
  try {
    const updatedRig = await Rig.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedRig);
  } catch (err) {
    res.status(404).json(err);
  }
}

async function deleteRig(req, res) {
  try {
    const deletedRig = await Rig.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: `${deletedRig.name} has been deleted`,
    });
  } catch (err) {
    res.status(404).json(err);
  }
}
