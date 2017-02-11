/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/events              ->  index
 * POST    /api/events              ->  create
 * GET     /api/events/:id          ->  show
 * PUT     /api/events/:id          ->  upsert
 * PATCH   /api/events/:id          ->  patch
 * DELETE  /api/events/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import validator from 'validator';
import Event from './event.model';
import EventCategory from '../eventCategory/eventCategory.model';

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
    console.log(err);
    res.status(statusCode).send(err);
  };
}

// Gets a list of Events
export function index(req, res) {
  return Event.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Event from the DB
export function show(req, res) {
  console.log(req.params.id);
 
  if(!validator.isMongoId(req.params.id+''))
    return res.status(400).send("Invalid Id");

  return Event.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Event from the DB
export function isRegistered(req, res) {
  
  if(!validator.isMongoId(req.params.id+''))
    return res.status(400).send("Invalid Id");

  return Event.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(event => {
      var isRegistered = false;
      isRegistered = event.registered.find(function(user){
        if(user.user.equals(req.user._id))
          return true;
        return false;
      })
      return res.json(isRegistered);
    })
    .catch(handleError(res));
}

// Creates a new Event in the DB
export function create(req, res) {
  console.log(req.body);
  return Event.create(req.body)
    .then(event=>{
      EventCategory.findById(event.eventCategory)
      .exec()
      .then(handleEntityNotFound(res))
      .then(eventCategory=>{
        console.log(eventCategory);
        eventCategory.events.push({event:event._id});
        eventCategory.save()
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
      })
      .catch(handleError(res));
    })
    .catch(handleError(res));
}

// Upserts the given Event in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  console.log(req.body);
  return Event.findOneAndUpdate(req.params.id, req.body, {upsert: true, new:true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function update(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  if(!validator.isMongoId(req.params.id+''))
    return res.status(400).send("Invalid Id");

  return Event.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(event=>{
    event.name=req.body.name;
    event.info=req.body.info;
    event.faq=req.body.faq;
    event.rules=req.body.rules;
    event.awards=req.body.awards;
    event.date=new Date(req.body.date)
    event.startTime=new Date(req.body.startTime)
    event.endTime=new Date(req.body.endTime);
    event.venue=req.body.venue;
    event.poster=req.body.poster;
    event.contact=req.body.contact;
    event.problemStatement=req.body.problemStatement;
    event.save()
    .then(respondWithResult(res))
    .catch(handleError(res));
    })
    .catch(handleError(res));
}

export function register (req, res){
  if(!validator.isMongoId(req.params.id+''))
    return res.status(400).send("Invalid Id");
  
  return Event.findById(req.params.id)
  .exec()
  .then( event =>{
    event.registered.push({user:req.user._id});
    event.save()
    .then(respondWithResult(res))
    .catch(handleError(res));
  })
  .catch(handleError(res));
}
// Updates an existing Event in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Event.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Event from the DB
export function destroy(req, res) {
  return Event.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
