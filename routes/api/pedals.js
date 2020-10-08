const express = require('express');
const router = express.Router();
const pedalCtrl = require('../../controllers/api/pedals');

router.get('/', pedalCtrl.index);
router.post('/', pedalCtrl.create);
router.get('/:id', pedalCtrl.show);
router.put('/:id', pedalCtrl.update);
router.delete('/:id', pedalCtrl.delete);

module.exports = router;
