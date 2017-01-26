'use strict';

describe('Component: EventCategoryComponent', function() {
  // load the controller's module
  beforeEach(module('mechanicaApp.eventCategory'));

  var EventCategoryComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    EventCategoryComponent = $componentController('eventCategory', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
