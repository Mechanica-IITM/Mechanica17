/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/meaEvents              ->  index
 * POST    /api/meaEvents              ->  create
 * GET     /api/meaEvents/:id          ->  show
 * PUT     /api/meaEvents/:id          ->  upsert
 * PATCH   /api/meaEvents/:id          ->  patch
 * DELETE  /api/meaEvents/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import MeaEvent from './meaEvent.model';
import House from '../house/house.model';
import User from '../user/user.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of MeaEvents
export function index(req, res) {
  return MeaEvent.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single MeaEvent from the DB
export function show(req, res) {
  return MeaEvent.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new MeaEvent in the DB
export function create(req, res) {
  return MeaEvent.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given MeaEvent in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return MeaEvent.findOneAndUpdate(req.params.id, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing MeaEvent in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return MeaEvent.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * Add registered event
 */

export function register(req, res) {

  // Add user to event
  return MeaEvent.findOneAndUpdate({ _id:req.params.eventId },{$push:{users:{user:req.user._id,score:0}}}, {upsert: true, setDefaultsOnInsert: true}).exec()
    .then(function(event){

      // Add event to house
      return House.findOneAndUpdate({name:req.user.house},{$push:{meaEvents:{user:req.user._id, meaEvent: event._id, score:0}}}, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()
      .then(respondWithResult(res))
      .catch(handleError(res));
    })
    .catch(handleError(res));

  
}

// Deletes a MeaEvent from the DB
export function destroy(req, res) {
  return MeaEvent.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
