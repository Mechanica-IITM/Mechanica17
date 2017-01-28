'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './event.routes';

export class EventComponent {
  /*@ngInject*/
    static $inject=['$scope','$http','$routeParams','$location'];
  constructor($scope,$http,$routeParams,$location) {
    var eventId=$routeParams.id;

    function strip(item){
        return item.split('\n');    
      };

    $http.get('/api/events/'+eventId)
      .then(response => {
        console.log(response.data);
        $scope.event = response.data.event;
        $scope.event.info=strip($scope.event.info);
        $scope.event.faq=strip($scope.event.faq);
        $scope.event.rules=strip($scope.event.rules);
        $scope.event.awards=strip($scope.event.awards);
        $scope.event.problemStatement=strip($scope.event.problemStatement);
        $scope.event.contact=strip($scope.event.contact);
      });
      
      $scope.imagePath="/assets/images/gear.png";
      $scope.register=false;

      $scope.registered=function(){
        $scope.register=true;
        
        $http.put('/api/events/register/'+eventId)
      .then(response => {
        $location.path('/')
        });


      }



  }
}

export default angular.module('mechanicaApp.event', [ngRoute])
  .config(routes)
  .component('event', {
    template: require('./event.html'),
    controller: EventComponent,
    controllerAs: 'eventCtrl'
  })
  .name;