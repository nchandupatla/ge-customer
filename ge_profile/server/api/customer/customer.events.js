/**
 * Customer model events
 */

'use strict';

import {EventEmitter} from 'events';
var CustomerEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CustomerEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Customer) {
  for(var e in events) {
    let event = events[e];
    Customer.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    CustomerEvents.emit(event + ':' + doc._id, doc);
    CustomerEvents.emit(event, doc);
  };
}

export {registerEvents};
export default CustomerEvents;
