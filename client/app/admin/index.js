'use strict';

import angular from 'angular';
import routes from './admin.routes';
import AdminController from './admin.controller';

export default angular.module('mechanicaApp.admin', ['mechanicaApp.auth','ngMaterial'])
  .config(routes)
  .controller('AdminController', AdminController)
  .name;
