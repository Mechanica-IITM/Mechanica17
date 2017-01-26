'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './eventCategory.routes';

export class EventCategoryComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('mechanicaApp.eventCategory', [ngRoute])
  .config(routes)
  .component('eventCategory', {
    template: require('./eventCategory.html'),
    controller: EventCategoryComponent,
    controllerAs: 'eventCategoryCtrl'
  })
  .name;
