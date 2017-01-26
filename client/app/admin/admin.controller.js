'use strict';

export default class AdminController {
  /*@ngInject*/
  constructor(User, $http, $scope, $interval) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    $scope.populateTeams = function(){
      var i=0;
      $interval(function(){
        $http.post('api/houses/'+i).then(function(response){
        	console.log(response);
          i++;
        }).then(function(err){
          console.log(err);
        })
      },1000,27)
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
     $scope.participants=[];
     
    $http.get('/api/meaEvents')
      .then(response => {
        $scope.events = response.data;

      });


    $http.get('/api/houses/display/leaderboard')
      .then(response => {
        $scope.leaderboard = response.data;
      });
    $http.get('/api/eventCategorys/')
      .then(response => {
        console.log(response.data);
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
                      $scope.participants.push(response.data);
                      
                    });

               }
               console.log($scope.participants);
               for(var k in $scope.participants)
                         {
                          $http.get('/api/houses/'+$scope.participants[k].house)
                            .then(response => {
                              $scope.participants[k].houseName=response.data.name;
                            }

                            );
                         }
            });    
        }

    $scope.event = {};
    $scope.eventSubmit=function(form){
      $scope.event.startTime = new Date($scope.event.date);
      $scope.event.startTime.setHours($scope.event.startTimeHrs);
      $scope.event.startTime.setMinutes($scope.event.startTimeMins);

      $scope.event.endTime = new Date($scope.event.date);
      $scope.event.endTime.setHours($scope.event.endTimeHrs);
      $scope.event.endTime.setMinutes($scope.event.endTimeMins);

      $scope.submitted=true;
      
      if(form.$valid)
      {
        var method = 'POST';
        var id = ''; // empty for creating new event
        if($scope.event._id){
          method = 'PUT';
          id = $scope.event._id;
        }

        $http({
          method : method,
          url : '/api/events/'+id,
          data : $scope.event
        }).then(function(response){
          location.reload();
        }).catch(function(err){
          console.log(err);
        })
      
      }
      else
        alert('Please Check the form');
    };

    $scope.editEvent = function(event){
      $scope.event = event;
      $scope.editThisEvent = true;
    }
    
    $scope.setEventNull = function(){
      $scope.event = {};
    }
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
          location.reload();

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
          location.reload();

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
