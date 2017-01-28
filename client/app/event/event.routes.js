'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/event/:id', {
      template: '<event></event>'
    });
}
