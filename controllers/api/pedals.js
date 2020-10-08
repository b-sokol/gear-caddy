const Pedal = require('../../models/pedal');

module.exports = {
  index,
  create,
  show,
  update,
  delete: deleteOne,
};

async function index(req, res) {
  try {
    const pedals = await Pedal.find({});
    res.status(200).json(pedals);
  } catch (err) {
    res.status(404).json(err);
  }
}

async function create(req, res) {
  try {
    const pedal = await Pedal.create(req.body);
    res.status(201).json(puppy);
  } catch (err) {
    res.status(404).json(err);
  }
}

async function show(req, res) {
  try {
    const pedal = await Pedal.findById(req.params.id);
    res.status(200).json(pedal);
  } catch (err) {
    res.status(404).json(err);
  }
}

async function update(req, res) {
  try {
    const updatedPedal = await Pedal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPedal);
  } catch (err) {
    res.status(404).json(err);
  }
}

async function deleteOne(req, res) {
  try {
    const deletedPedal = await Pedal.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({
        message: `${deletedPedal.make} ${deletedPedal.model} has been deleted`,
      });
  } catch (err) {
    res.status(404).json(err);
  }
}
