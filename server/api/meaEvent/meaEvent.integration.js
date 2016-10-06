'use strict';

var app = require('../..');
import request from 'supertest';

var newMeaEvent;

describe('MeaEvent API:', function() {
  describe('GET /api/meaEvents', function() {
    var meaEvents;

    beforeEach(function(done) {
      request(app)
        .get('/api/meaEvents')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          meaEvents = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(meaEvents).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/meaEvents', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/meaEvents')
        .send({
          name: 'New MeaEvent',
          info: 'This is the brand new meaEvent!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newMeaEvent = res.body;
          done();
        });
    });

    it('should respond with the newly created meaEvent', function() {
      expect(newMeaEvent.name).to.equal('New MeaEvent');
      expect(newMeaEvent.info).to.equal('This is the brand new meaEvent!!!');
    });
  });

  describe('GET /api/meaEvents/:id', function() {
    var meaEvent;

    beforeEach(function(done) {
      request(app)
        .get(`/api/meaEvents/${newMeaEvent._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          meaEvent = res.body;
          done();
        });
    });

    afterEach(function() {
      meaEvent = {};
    });

    it('should respond with the requested meaEvent', function() {
      expect(meaEvent.name).to.equal('New MeaEvent');
      expect(meaEvent.info).to.equal('This is the brand new meaEvent!!!');
    });
  });

  describe('PUT /api/meaEvents/:id', function() {
    var updatedMeaEvent;

    beforeEach(function(done) {
      request(app)
        .put(`/api/meaEvents/${newMeaEvent._id}`)
        .send({
          name: 'Updated MeaEvent',
          info: 'This is the updated meaEvent!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedMeaEvent = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMeaEvent = {};
    });

    it('should respond with the original meaEvent', function() {
      expect(updatedMeaEvent.name).to.equal('New MeaEvent');
      expect(updatedMeaEvent.info).to.equal('This is the brand new meaEvent!!!');
    });

    it('should respond with the updated meaEvent on a subsequent GET', function(done) {
      request(app)
        .get(`/api/meaEvents/${newMeaEvent._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let meaEvent = res.body;

          expect(meaEvent.name).to.equal('Updated MeaEvent');
          expect(meaEvent.info).to.equal('This is the updated meaEvent!!!');

          done();
        });
    });
  });

  describe('PATCH /api/meaEvents/:id', function() {
    var patchedMeaEvent;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/meaEvents/${newMeaEvent._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched MeaEvent' },
          { op: 'replace', path: '/info', value: 'This is the patched meaEvent!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedMeaEvent = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedMeaEvent = {};
    });

    it('should respond with the patched meaEvent', function() {
      expect(patchedMeaEvent.name).to.equal('Patched MeaEvent');
      expect(patchedMeaEvent.info).to.equal('This is the patched meaEvent!!!');
    });
  });

  describe('DELETE /api/meaEvents/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/meaEvents/${newMeaEvent._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when meaEvent does not exist', function(done) {
      request(app)
        .delete(`/api/meaEvents/${newMeaEvent._id}`)
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
