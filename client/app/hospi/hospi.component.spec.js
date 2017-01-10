'use strict';

describe('Component: HospiComponent', function() {
  // load the controller's module
  beforeEach(module('mechanicaApp.hospi'));

  var HospiComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    HospiComponent = $componentController('hospi', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
