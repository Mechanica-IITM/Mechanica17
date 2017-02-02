'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './starter.routes';

export class StarterComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('mechanicaApp.starter', [ngRoute])
  .config(routes)
  .component('starter', {
    template: require('./starter.html'),
    controller: StarterComponent,
    controllerAs: 'starterCtrl'
  })
  .name;
