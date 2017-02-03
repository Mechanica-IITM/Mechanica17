'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {

  constructor($location, Auth) {
    'ngInject';

    this.$location = $location;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;

    if(!($location.path().search('starter')+1)){
      this.audio = new Audio('assets/images/audio.mp3');
      this.audio.loop = true;
      this.audio.play();
      this.audio.isPlaying = true;
    }

  }

  playControl(){
    if(this.audio.isPlaying){
      this.audio.pause();
      this.audio.isPlaying = false;
    }
    else{
      this.audio.play();
      this.audio.isPlaying = true;
    }
  }

  isActive(route) {
    return route === this.$location.path();
  }
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
