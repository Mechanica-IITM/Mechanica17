import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {

  /*@ngInject*/
  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket;
    this.isLoggedIn = Auth.isLoggedInSync;
    $scope.user = Auth.getCurrentUserSync();
  }

  $onInit() {
    this.$http.get('/api/events')
      .then(response => {
        this.events = response.data;
        this.socket.syncUpdates('event', this.events);
      });
  }

  registerEvent(event)
  {
    this.$http.put('/api/events/register/'+event._id);
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
