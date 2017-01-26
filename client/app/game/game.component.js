'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './game.routes';

export class GameComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('mechanicaApp.game', [ngRoute])
  .config(routes)
  .component('game', {
    template: require('./game.html'),
    controller: GameComponent,
    controllerAs: 'gameCtrl'
  })
  .name;
