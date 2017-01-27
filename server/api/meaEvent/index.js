'use strict';

import * as auth from '../../auth/auth.service';

var express = require('express');
var controller = require('./meaEvent.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.upsert);
router.put('/register/:eventId', auth.isAuthenticated(), controller.register);
// router.patch('/:id',auth.hasRole('admin') controller.patch);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
