'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/contacts', controller.contacts);
router.get('/spons', controller.spons);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.hasRole('admin'), controller.show);
router.post('/', controller.create);
router.post('/setHighScore', auth.isAuthenticated(), controller.setHighScore);
router.get('/get/highscores', controller.getHighScore);
router.get('/setScoreZero', auth.hasRole('admin'), controller.setScoreZero);

module.exports = router;
