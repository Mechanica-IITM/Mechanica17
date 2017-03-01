'use strict';

var express = require('express');
var controller = require('./event.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

// router.get('/', controller.index);
router.get('/:id', controller.show);

router.get('/isRegistered/:id', auth.isAuthenticated(), controller.isRegistered);
router.post('/', auth.hasRole('admin'), controller.create);
router.get('/getRegisteredUsers/:id', auth.hasRole('admin'),controller.getRegisteredUsers);
router.post('/genExcel/:id', auth.hasRole('admin'),controller.convertToExcel);
// router.put('/:id', auth.hasRole('admin'), controller.upsert);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.put('/register/:id', auth.isAuthenticated(), controller.register);
// router.patch('/:id', controller.patch);
// router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
