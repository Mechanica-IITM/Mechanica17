'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/hospi', {
      template: '<hospi></hospi>'
    });
}
