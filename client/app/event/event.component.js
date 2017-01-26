'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './event.routes';

export class EventComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('mechanicaApp.event', [ngRoute])
  .config(routes)
  .component('event', {
    template: require('./event.html'),
    controller: EventComponent,
    controllerAs: 'eventCtrl'
  })
  .name;
