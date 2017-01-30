'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './event.routes';

export class EventComponent {
  /*@ngInject*/
    static $inject=['$scope','$http','$routeParams','$location', '$q', 'Auth'];
  constructor($scope,$http,$routeParams,$location, $q, Auth) {
    var eventId = $routeParams.id;
    this.$q = $q;

    function strip(item){
      return item.split('\n');    
    };

    $http.get('/api/events/'+eventId)
      .then(response => {
        $scope.event = response.data;

        $scope.event.info=strip($scope.event.info);
        $scope.event.faq=strip($scope.event.faq);
        $scope.event.rules=strip($scope.event.rules);
        $scope.event.awards=strip($scope.event.awards);
        $scope.event.contact=strip($scope.event.contact);

        this.checkImageAndReplace($scope.event.poster, '/assets/images/eventBgDefault.jpg', src=>{
          $scope.poster = src;
        })
      })
      .catch(err =>{
        console.log(err);
      });
      

      Auth.isLoggedIn(loggenIn=>{
        if(loggenIn)
          $http.get('/api/events/isRegistered/'+eventId)
          .then(response =>{
            $scope.isRegistered = response.data;
          })
      })

      $scope.register=function(){
        $scope.isRegistered = true;
        
        $http.put('/api/events/register/'+eventId)
        .catch(response => {
          $scope.isRegistered = false
        });


      }



  }

  checkImageAndReplace(givenUrl, defaultUrl, cb){
    if(!givenUrl)
      return cb(defaultUrl);
    else{
      var src = givenUrl;
      isImage(givenUrl, this.$q).then(function(response){
        if(!response)
          src = defaultUrl;
        return cb(src);
      })
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


// Checks if image exists at given url
function isImage(src, $q) {

    var deferred = $q.defer();

    var image = new Image();
    image.onerror = function() {
        deferred.resolve(false);
    };
    image.onload = function() {
        deferred.resolve(true);
    };
    image.src = src;

    return deferred.promise;
};
