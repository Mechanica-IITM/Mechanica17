import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

// import Observable from 'rxjs/Rx';

export class MainController {

  /*@ngInject*/
  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.$scope=$scope;
    this.socket = socket;
    this.isLoggedIn = Auth.isLoggedInSync;
    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });

    var list = ["Events & Competitions", "Workshops", "Design and Build"];
    var i = 0;
    this.listItem = list[i];
    this.message = 1;
     // Observable.interval(500)
     //          .subscribe((x) => {
     //            this.message++;
     //          }):


  }

  $onInit() {
    this.$http.get('/api/things')

      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });

    this.$http.get('/api/meaEvents')
      .then(response => {
        this.events = response.data;
        this.socket.syncUpdates('event', this.events);
      });

  }

  addThing() {
    if(this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }

  registerEvent(event)
  {
    this.$http.put('/api/meaEvents/register/'+event._id);
    console.log("Successfully registered");
    
  }

}

export default angular.module('mechanicaApp.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
