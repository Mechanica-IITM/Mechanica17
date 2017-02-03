'use strict';

import launch from './launch.component';
import {
  LaunchController
} from './launch.component';

describe('Component: LaunchComponent', function() {
  beforeEach(angular.mock.module(launch));
  beforeEach(angular.mock.module('socketMock'));

  var scope;
  var launchComponent;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $http, $componentController, $rootScope, socket) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    launchComponent = $componentController('launch', {
      $http,
      $scope: scope,
      socket
    });
  }));

  it('should attach a list of things to the controller', function() {
    launchComponent.$onInit();
    $httpBackend.flush();
    expect(launchComponent.awesomeThings.length)
      .to.equal(4);
  });
});
