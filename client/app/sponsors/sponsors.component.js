'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './sponsors.routes';

export class SponsorsComponent {
  // 'ngInject';
  static $inject = ['$http', '$scope'];
  constructor($http, $scope) {
    $http.get('/api/users/spons/').then(function(response){
      $scope.spons = response.data;
      console.log(this.spons);
    })
    // this.spons = [
    //             {title:"Title Sponsor"},
    //             {title:"Merchandise Partner"},
    //             {title:"Design Partner"},
    //             {title:"Events Partner"},
    //             {title:"Education Partner", num: [1,2,3]},
    //             {title:"Knowledge Partner"},
    //             {title:"Finance Partner"},
    //             {title:"Professional Training Partner"},
    //             {title:"Workshop Partner"},
    //             {title:"Travel Partner"},
    //             {title:"Student Opportunity Partner"},
    //             {title:"Entertainment Partner"},
    //             {title:"Ticketing Partner"},
    //             {title:"Online Media Partner", num:[1,2]},
    //           ]
  }
}

export default angular.module('mechanicaApp.sponsors', [ngRoute])
  .config(routes)
  .component('sponsors', {
    template: require('./sponsors.html'),
    controller: SponsorsComponent,
    controllerAs: 'vm'
  })
  .name;
