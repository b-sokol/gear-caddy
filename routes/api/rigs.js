const express = require('express');
const router = express.Router();
const rigCtrl = require('../../controllers/api/rigs');

router.get('/', rigCtrl.index);
router.post('/', checkAuth, rigCtrl.create);
router.get('/:id', checkAuth, rigCtrl.show);
router.put('/:id', checkAuth, rigCtrl.update);
router.delete('/:id', checkAuth, rigCtrl.delete);

function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;
