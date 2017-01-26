'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/event', {
      template: '<event></event>'
    });
}
