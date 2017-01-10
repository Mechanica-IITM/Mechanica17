'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './hospi.routes';

export class HospiComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('mechanicaApp.hospi', [ngRoute])
  .config(routes)
  .component('hospi', {
    template: require('./hospi.html'),
    controller: HospiComponent,
    controllerAs: 'vm'
  })
  .name;
