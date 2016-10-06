'use strict';

var app = require('../..');
import request from 'supertest';

var newHouse;

describe('House API:', function() {
  describe('GET /api/houses', function() {
    var houses;

    beforeEach(function(done) {
      request(app)
        .get('/api/houses')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          houses = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(houses).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/houses', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/houses')
        .send({
          name: 'New House',
          info: 'This is the brand new house!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newHouse = res.body;
          done();
        });
    });

    it('should respond with the newly created house', function() {
      expect(newHouse.name).to.equal('New House');
      expect(newHouse.info).to.equal('This is the brand new house!!!');
    });
  });

  describe('GET /api/houses/:id', function() {
    var house;

    beforeEach(function(done) {
      request(app)
        .get(`/api/houses/${newHouse._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          house = res.body;
          done();
        });
    });

    afterEach(function() {
      house = {};
    });

    it('should respond with the requested house', function() {
      expect(house.name).to.equal('New House');
      expect(house.info).to.equal('This is the brand new house!!!');
    });
  });

  describe('PUT /api/houses/:id', function() {
    var updatedHouse;

    beforeEach(function(done) {
      request(app)
        .put(`/api/houses/${newHouse._id}`)
        .send({
          name: 'Updated House',
          info: 'This is the updated house!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedHouse = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedHouse = {};
    });

    it('should respond with the original house', function() {
      expect(updatedHouse.name).to.equal('New House');
      expect(updatedHouse.info).to.equal('This is the brand new house!!!');
    });

    it('should respond with the updated house on a subsequent GET', function(done) {
      request(app)
        .get(`/api/houses/${newHouse._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let house = res.body;

          expect(house.name).to.equal('Updated House');
          expect(house.info).to.equal('This is the updated house!!!');

          done();
        });
    });
  });

  describe('PATCH /api/houses/:id', function() {
    var patchedHouse;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/houses/${newHouse._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched House' },
          { op: 'replace', path: '/info', value: 'This is the patched house!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedHouse = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedHouse = {};
    });

    it('should respond with the patched house', function() {
      expect(patchedHouse.name).to.equal('Patched House');
      expect(patchedHouse.info).to.equal('This is the patched house!!!');
    });
  });

  describe('DELETE /api/houses/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/houses/${newHouse._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when house does not exist', function(done) {
      request(app)
        .delete(`/api/houses/${newHouse._id}`)
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
