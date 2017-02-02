'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/starter', {
      template: '<starter></starter>'
    });
}
