'use strict';

import angular from 'angular';
import moment from 'moment';
import ngAnimate from 'angular-animate';

import ngAria from 'angular-aria';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngMessages from 'angular-messages';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';
const ngRoute = require('angular-route');


import uiBootstrap from 'angular-ui-bootstrap';
import ngMaterial from 'angular-material';
// import ngMaterialDatePicker from 'angular-material-datetimepicker';
// import ngValidationMatch from 'angular-validation-match';

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import contactUs from './contactUs/contactUs.component';
import eventCategory from './eventCategory/eventCategory.component';
import event from './event/event.component';
import game from './game/game.component';
import hospi from './hospi/hospi.component';
import sponsors from './sponsors/sponsors.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';

import './app.css';

angular.module('mechanicaApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', ngRoute,
    uiBootstrap,ngAnimate,ngAria,_Auth, account, ngMaterial, ngMessages, admin, navbar, footer, main, contactUs, sponsors, event, eventCategory, game, hospi, constants, socket, util
    ])
  .config(routeConfig)
  .directive('userCard', function () {
    return {
      restrict: 'E',
      templateUrl: 'usercard.html',
      scope: {
        name: '@',
        theme: '@'
      },
      controller: function ($scope) {
    'ngInject';

        $scope.theme = $scope.theme || 'default';
      }
    }
  })
  .directive('regularCard', function () {
    return {
      restrict: 'E',
      templateUrl: 'regularcard.html',
      scope: {
        user: '=',
      }
    }
  })
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['mechanicaApp'], {
      strictDi: true
    });
  });
