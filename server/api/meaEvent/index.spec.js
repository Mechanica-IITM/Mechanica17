'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var meaEventCtrlStub = {
  index: 'meaEventCtrl.index',
  show: 'meaEventCtrl.show',
  create: 'meaEventCtrl.create',
  upsert: 'meaEventCtrl.upsert',
  patch: 'meaEventCtrl.patch',
  destroy: 'meaEventCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var meaEventIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './meaEvent.controller': meaEventCtrlStub
});

describe('MeaEvent API Router:', function() {
  it('should return an express router instance', function() {
    expect(meaEventIndex).to.equal(routerStub);
  });

  describe('GET /api/meaEvents', function() {
    it('should route to meaEvent.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'meaEventCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/meaEvents/:id', function() {
    it('should route to meaEvent.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'meaEventCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/meaEvents', function() {
    it('should route to meaEvent.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'meaEventCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/meaEvents/:id', function() {
    it('should route to meaEvent.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'meaEventCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/meaEvents/:id', function() {
    it('should route to meaEvent.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'meaEventCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/meaEvents/:id', function() {
    it('should route to meaEvent.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'meaEventCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
