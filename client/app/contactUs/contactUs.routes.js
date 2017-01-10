'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/contactUs', {
      template: '<contact-us></contact-us>'
    });
}
