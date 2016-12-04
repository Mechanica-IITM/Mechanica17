'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var eventCategoryCtrlStub = {
  index: 'eventCategoryCtrl.index',
  show: 'eventCategoryCtrl.show',
  create: 'eventCategoryCtrl.create',
  upsert: 'eventCategoryCtrl.upsert',
  patch: 'eventCategoryCtrl.patch',
  destroy: 'eventCategoryCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var eventCategoryIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './eventCategory.controller': eventCategoryCtrlStub
});

describe('EventCategory API Router:', function() {
  it('should return an express router instance', function() {
    expect(eventCategoryIndex).to.equal(routerStub);
  });

  describe('GET /api/eventCategorys', function() {
    it('should route to eventCategory.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'eventCategoryCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/eventCategorys/:id', function() {
    it('should route to eventCategory.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'eventCategoryCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/eventCategorys', function() {
    it('should route to eventCategory.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'eventCategoryCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/eventCategorys/:id', function() {
    it('should route to eventCategory.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'eventCategoryCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/eventCategorys/:id', function() {
    it('should route to eventCategory.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'eventCategoryCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/eventCategorys/:id', function() {
    it('should route to eventCategory.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'eventCategoryCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
