'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './eventCategory.routes';

export class EventCategoryComponent {
  /*@ngInject*/
  static $inject=['$scope','$http','$location'];
  constructor($scope,$http,$location) {
    $http.get('/api/eventCategorys/')
      .then(response => {
        console.log(response.data);
        $scope.eventCategories = response.data;
        for (var i = $scope.eventCategories.length - 1; i >= 0; i--) {
          $scope.eventCategories[i].info=$scope.eventCategories[i].info.split('\n');
        }
      });

    $scope.imagePath="/assets/images/gear.png";

      $scope.goToEvent=function(id) {
        $location.path('event/' +id);
      }
  }


}

export default angular.module('mechanicaApp.eventCategory', [ngRoute])
  .config(routes)
  .component('eventCategory', {
    template: require('./eventCategory.html'),
    controller: EventCategoryComponent,
    controllerAs: 'eventCategoryCtrl'
  })
  .name;
