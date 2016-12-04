'use strict';

var app = require('../..');
import request from 'supertest';

var newEventCategory;

describe('EventCategory API:', function() {
  describe('GET /api/eventCategorys', function() {
    var eventCategorys;

    beforeEach(function(done) {
      request(app)
        .get('/api/eventCategorys')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          eventCategorys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(eventCategorys).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/eventCategorys', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/eventCategorys')
        .send({
          name: 'New EventCategory',
          info: 'This is the brand new eventCategory!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newEventCategory = res.body;
          done();
        });
    });

    it('should respond with the newly created eventCategory', function() {
      expect(newEventCategory.name).to.equal('New EventCategory');
      expect(newEventCategory.info).to.equal('This is the brand new eventCategory!!!');
    });
  });

  describe('GET /api/eventCategorys/:id', function() {
    var eventCategory;

    beforeEach(function(done) {
      request(app)
        .get(`/api/eventCategorys/${newEventCategory._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          eventCategory = res.body;
          done();
        });
    });

    afterEach(function() {
      eventCategory = {};
    });

    it('should respond with the requested eventCategory', function() {
      expect(eventCategory.name).to.equal('New EventCategory');
      expect(eventCategory.info).to.equal('This is the brand new eventCategory!!!');
    });
  });

  describe('PUT /api/eventCategorys/:id', function() {
    var updatedEventCategory;

    beforeEach(function(done) {
      request(app)
        .put(`/api/eventCategorys/${newEventCategory._id}`)
        .send({
          name: 'Updated EventCategory',
          info: 'This is the updated eventCategory!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedEventCategory = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedEventCategory = {};
    });

    it('should respond with the original eventCategory', function() {
      expect(updatedEventCategory.name).to.equal('New EventCategory');
      expect(updatedEventCategory.info).to.equal('This is the brand new eventCategory!!!');
    });

    it('should respond with the updated eventCategory on a subsequent GET', function(done) {
      request(app)
        .get(`/api/eventCategorys/${newEventCategory._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let eventCategory = res.body;

          expect(eventCategory.name).to.equal('Updated EventCategory');
          expect(eventCategory.info).to.equal('This is the updated eventCategory!!!');

          done();
        });
    });
  });

  describe('PATCH /api/eventCategorys/:id', function() {
    var patchedEventCategory;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/eventCategorys/${newEventCategory._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched EventCategory' },
          { op: 'replace', path: '/info', value: 'This is the patched eventCategory!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedEventCategory = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedEventCategory = {};
    });

    it('should respond with the patched eventCategory', function() {
      expect(patchedEventCategory.name).to.equal('Patched EventCategory');
      expect(patchedEventCategory.info).to.equal('This is the patched eventCategory!!!');
    });
  });

  describe('DELETE /api/eventCategorys/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/eventCategorys/${newEventCategory._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when eventCategory does not exist', function(done) {
      request(app)
        .delete(`/api/eventCategorys/${newEventCategory._id}`)
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
