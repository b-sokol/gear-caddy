const express = require('express');
const router = express.Router();
const pedalCtrl = require('../../controllers/api/pedals');

router.get('/', pedalCtrl.index);
router.post('/', checkAuth, pedalCtrl.create);
router.get('/:id', checkAuth, pedalCtrl.show);
router.put('/:id', checkAuth, pedalCtrl.update);
router.delete('/:id', checkAuth, pedalCtrl.delete);

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;
