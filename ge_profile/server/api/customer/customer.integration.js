'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newCustomer;

describe('Customer API:', function() {
  describe('GET /yes', function() {
    var customers;

    beforeEach(function(done) {
      request(app)
        .get('/yes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          customers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      customers.should.be.instanceOf(Array);
    });
  });

  describe('POST /yes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/yes')
        .send({
          name: 'New Customer',
          info: 'This is the brand new customer!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newCustomer = res.body;
          done();
        });
    });

    it('should respond with the newly created customer', function() {
      newCustomer.name.should.equal('New Customer');
      newCustomer.info.should.equal('This is the brand new customer!!!');
    });
  });

  describe('GET /yes/:id', function() {
    var customer;

    beforeEach(function(done) {
      request(app)
        .get(`/yes/${newCustomer._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          customer = res.body;
          done();
        });
    });

    afterEach(function() {
      customer = {};
    });

    it('should respond with the requested customer', function() {
      customer.name.should.equal('New Customer');
      customer.info.should.equal('This is the brand new customer!!!');
    });
  });

  describe('PUT /yes/:id', function() {
    var updatedCustomer;

    beforeEach(function(done) {
      request(app)
        .put(`/yes/${newCustomer._id}`)
        .send({
          name: 'Updated Customer',
          info: 'This is the updated customer!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedCustomer = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCustomer = {};
    });

    it('should respond with the updated customer', function() {
      updatedCustomer.name.should.equal('Updated Customer');
      updatedCustomer.info.should.equal('This is the updated customer!!!');
    });

    it('should respond with the updated customer on a subsequent GET', function(done) {
      request(app)
        .get(`/yes/${newCustomer._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let customer = res.body;

          customer.name.should.equal('Updated Customer');
          customer.info.should.equal('This is the updated customer!!!');

          done();
        });
    });
  });

  describe('PATCH /yes/:id', function() {
    var patchedCustomer;

    beforeEach(function(done) {
      request(app)
        .patch(`/yes/${newCustomer._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Customer' },
          { op: 'replace', path: '/info', value: 'This is the patched customer!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedCustomer = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedCustomer = {};
    });

    it('should respond with the patched customer', function() {
      patchedCustomer.name.should.equal('Patched Customer');
      patchedCustomer.info.should.equal('This is the patched customer!!!');
    });
  });

  describe('DELETE /yes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/yes/${newCustomer._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when customer does not exist', function(done) {
      request(app)
        .delete(`/yes/${newCustomer._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
