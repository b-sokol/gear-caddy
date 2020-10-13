const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const usersCtrl = require('../../controllers/api/users');

router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);



router.get('/', usersCtrl.index);
router.post('/', usersCtrl.create);
router.get('/:id', usersCtrl.show);
router.put('/:id', usersCtrl.update);
router.delete('/:id', usersCtrl.delete);




module.exports = router;
