'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var customerCtrlStub = {
  index: 'customerCtrl.index',
  show: 'customerCtrl.show',
  create: 'customerCtrl.create',
  upsert: 'customerCtrl.upsert',
  patch: 'customerCtrl.patch',
  destroy: 'customerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var customerIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './customer.controller': customerCtrlStub
});

describe('Customer API Router:', function() {
  it('should return an express router instance', function() {
    customerIndex.should.equal(routerStub);
  });

  describe('GET /yes', function() {
    it('should route to customer.controller.index', function() {
      routerStub.get
        .withArgs('/', 'customerCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /yes/:id', function() {
    it('should route to customer.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'customerCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /yes', function() {
    it('should route to customer.controller.create', function() {
      routerStub.post
        .withArgs('/', 'customerCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /yes/:id', function() {
    it('should route to customer.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'customerCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /yes/:id', function() {
    it('should route to customer.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'customerCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /yes/:id', function() {
    it('should route to customer.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'customerCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
