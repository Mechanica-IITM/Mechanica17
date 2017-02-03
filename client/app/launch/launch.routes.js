'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/launch', {
    template: '<launch></launch>'
  });
}
