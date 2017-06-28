/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/datas              ->  index
 * POST    /api/datas              ->  create
 * GET     /api/datas/:id          ->  show
 * PUT     /api/datas/:id          ->  upsert
 * PATCH   /api/datas/:id          ->  patch
 * DELETE  /api/datas/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Data from './data.model';

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

// Gets a list of Datas
export function index(req, res) {
  return Data.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Data from the DB
export function show(req, res) {
  return Data.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Data in the DB
export function create(req, res) {
  return Data.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Data in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Data.findOneAndUpdate(req.params.id, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Data in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Data.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Data from the DB
export function destroy(req, res) {
  return Data.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
