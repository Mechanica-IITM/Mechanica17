'use strict';

describe('Component: StarterComponent', function() {
  // load the controller's module
  beforeEach(module('mechanicaApp.starter'));

  var StarterComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    StarterComponent = $componentController('starter', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
