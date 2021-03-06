'use strict';

var _express = require('express');

var _user = require('./user.controller');

var controller = _interopRequireWildcard(_user);

var _auth = require('../../auth/auth.service');

var auth = _interopRequireWildcard(_auth);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var router = new _express.Router();

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
//# sourceMappingURL=index.js.map
