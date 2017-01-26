'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/game', {
      template: '<game></game>'
    });
}
