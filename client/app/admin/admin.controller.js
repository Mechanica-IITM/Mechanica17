'use strict';

export default class AdminController {
  /*@ngInject*/
  constructor(User, $http, $scope, $interval) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    $http.get('api/houses/').then(function(response){
      console.log(response);
    })
    $scope.populateTeams = function(){
      var i=0;
      $interval(function(){
        $http.post('api/houses/'+i).then(function(response){
        	console.log(response);
          i++;
        })
      },10000,4)
    }
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}
