'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './eventCategory.routes';

export class EventCategoryComponent {
  /*@ngInject*/
  static $inject=['$scope','$http','$location', '$q'];
  constructor($scope,$http,$location, $q) {
    this.$q = $q;
    this.$scope = $scope;

    $http.get('/api/eventCategorys/')
      .then(response => {
        $scope.eventCategories = response.data;

        // Replaces images if they dont exist in recurrence
        this.recur($scope.eventCategories, 0);


      });

      $scope.goToEvent=function(id) {
        $location.path('event/' +id);
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

  recur(eventCategories, j){
    this.checkImageAndReplace(eventCategories[j].imgURL, '/assets/images/eventBgDefault.jpg', src=>{
      eventCategories[j].poster = src;
      j++;
      if(j<eventCategories.length)
        this.recur(eventCategories, j)
    })
  }


}

export default angular.module('mechanicaApp.eventCategory', [ngRoute])
  .config(routes)
  .component('eventCategory', {
    template: require('./eventCategory.html'),
    controller: EventCategoryComponent,
    controllerAs: 'vm'
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

