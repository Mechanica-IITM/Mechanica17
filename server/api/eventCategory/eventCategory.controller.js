/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/eventCategorys              ->  index
 * POST    /api/eventCategorys              ->  create
 * GET     /api/eventCategorys/:id          ->  show
 * PUT     /api/eventCategorys/:id          ->  upsert
 * PATCH   /api/eventCategorys/:id          ->  patch
 * DELETE  /api/eventCategorys/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import validator from 'validator';
import EventCategory from './eventCategory.model';

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

// Gets a list of EventCategorys
export function index(req, res) {
  return EventCategory.find().populate('events.event').exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single EventCategory from the DB
export function show(req, res) {
  if(!validator.isMongoId(req.params.id+''))
    return res.status(400).send("Invalid Id");

  return EventCategory.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new EventCategory in the DB
export function create(req, res) {
  return EventCategory.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given EventCategory in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return EventCategory.findOneAndUpdate(req.params.id, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}
export function update(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  if(!validator.isMongoId(req.params.id+''))
    return res.status(400).send("Invalid Id");

  return EventCategory.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(eventCategory=>{
    eventCategory.name=req.body.name;
    eventCategory.info=req.body.info;
    eventCategory.imgURL=req.body.imgURL;
    eventCategory.save()
    .then(respondWithResult(res))
    .catch(handleError(res));
    })
    .catch(handleError(res));
}


// Updates an existing EventCategory in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return EventCategory.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a EventCategory from the DB
export function destroy(req, res) {
  return EventCategory.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
