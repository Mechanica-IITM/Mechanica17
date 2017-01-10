'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/sponsors', {
      template: '<sponsors></sponsors>'
    });
}
