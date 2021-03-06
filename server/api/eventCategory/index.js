'use strict';

var express = require('express');
var controller = require('./eventCategory.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/:name', controller.show); // Knowingly changed from id to name
router.post('/', auth.hasRole('admin'), controller.create);
// router.put('/:id', auth.hasRole('admin'), controller.upsert);
// router.patch('/:id', controller.patch);
router.put('/:id', auth.hasRole('admin'), controller.update);
// router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;