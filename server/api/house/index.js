'use strict';

var express = require('express');
var controller = require('./house.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/display/leaderboard/', controller.leaderboard);
router.post('/:i', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.upsert);
// router.patch('/:id', controller.patch);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
