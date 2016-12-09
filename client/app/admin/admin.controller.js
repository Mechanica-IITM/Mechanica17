'use strict';

export default class AdminController {
  /*@ngInject*/
  constructor(User, $http, $scope, $interval,$location) {
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
        }).then(function(err){
          console.log(err);
        })
      },10000,4)
    }
     $scope.submitted=false;
     $scope.submitted1=false;
     $scope.isCollapsed=true;
     $scope.isCollapsed1=false;
     $scope.isCollapsed2=true;
     $scope.isCollapsed3=true;
     $scope.dateOpen=false;
     $scope.ismeridian=true;
     $scope.participantIds=[];

    $http.get('/api/meaEvents')
      .then(response => {
        $scope.events = response.data;

      });
     
    $http.get('/api/eventCategorys')
      .then(response => {
        $scope.eventCategories = response.data;

      });
      

      $scope.registered=function(eventId){
        
        $http.get('/api/meaEvents/'+eventId)
          .then(response => {
              $scope.registeredUsers = response.data.users;

              for(var i in $scope.registeredUsers)
               {
                $scope.participantIds.push($scope.registeredUsers[i].user);
               }
              
              for(var j in $scope.participantIds)
               {
                $http.get('/api/users/'+$scope.participantIds[j])
                .then(response => {
                      $scope.participants = response.data;
                      console.log($scope.participants);
                    });

               }
 
            });    
        }

     $scope.eventSubmit=function(form){
      $scope.submitted=true;
      if(form.$valid)
      {
        $http.post('/api/events',
          { 
            name:$scope.name,
            info:$scope.info,
            awards:$scope.awards,
            faq:$scope.faq,
            rules:$scope.rules            
          }
        ).then(function(response){
          $location.path('/');

        }).then(function(err){
          console.log(err);
        })
      
      }
    };
    
    $scope.meaEventSubmit=function(form){
      $scope.submitted=true;
      if(form.$valid)
      {
        $http.post('/api/meaEvents',
          { 
            name:$scope.meaName,
            venue:$scope.meaVenue,
            info:$scope.meaInfo,
            date:$scope.meaDate
          }
        ).then(function(response){
          $location.path('/');

        }).then(function(err){
          console.log(err);
        })
      
      }
    };

    $scope.eventCategorySubmit=function(form){
      $scope.submitted1=true;
      if(form.$valid)
      {
        $http.post('/api/eventCategorys',
          { 
            name:$scope.CategoryName,
            info:$scope.CategoryInfo
          }
        ).then(function(response){
          $location.path('/');

        }).then(function(err){
          console.log(err);
        })
      
      }
    };

    
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}
