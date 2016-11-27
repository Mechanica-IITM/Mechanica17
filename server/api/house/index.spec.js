'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var houseCtrlStub = {
  index: 'houseCtrl.index',
  show: 'houseCtrl.show',
  create: 'houseCtrl.create',
  upsert: 'houseCtrl.upsert',
  patch: 'houseCtrl.patch',
  destroy: 'houseCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var houseIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './house.controller': houseCtrlStub
});

describe('House API Router:', function() {
  it('should return an express router instance', function() {
    expect(houseIndex).to.equal(routerStub);
  });

  describe('GET /api/houses', function() {
    it('should route to house.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'houseCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/houses/:id', function() {
    it('should route to house.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'houseCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/houses/:i', function() {
    it('should route to house.controller.create', function() {
      expect(routerStub.post
        .withArgs('/:i', 'houseCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/houses/:id', function() {
    it('should route to house.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'houseCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/houses/:id', function() {
    it('should route to house.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'houseCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/houses/:id', function() {
    it('should route to house.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'houseCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
