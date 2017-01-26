'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/eventCategories', {
      template: '<event-category></event-category>'
    });
}
