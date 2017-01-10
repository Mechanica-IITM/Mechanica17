'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './sponsors.routes';

export class SponsorsComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('mechanicaApp.sponsors', [ngRoute])
  .config(routes)
  .component('sponsors', {
    template: require('./sponsors.html'),
    controller: SponsorsComponent,
    controllerAs: 'vm'
  })
  .name;
