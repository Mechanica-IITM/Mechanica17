/**
 * MeaEvent model events
 */

'use strict';

import {EventEmitter} from 'events';
import MeaEvent from './meaEvent.model';
var MeaEventEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MeaEventEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  MeaEvent.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MeaEventEvents.emit(event + ':' + doc._id, doc);
    MeaEventEvents.emit(event, doc);
  };
}

export default MeaEventEvents;
