/**
 * House model events
 */

'use strict';

import {EventEmitter} from 'events';
import House from './house.model';
var HouseEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
HouseEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  House.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    HouseEvents.emit(event + ':' + doc._id, doc);
    HouseEvents.emit(event, doc);
  };
}

export default HouseEvents;
