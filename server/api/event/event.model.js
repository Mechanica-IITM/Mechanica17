'use strict';

import mongoose from 'mongoose';

var EventSchema = new mongoose.Schema({
  name: String,
  info: {type:String, default:''},
  startTime: Date,
  endTime: Date,
  date:Date,
  awards: {type:String, default:''},
  faq: {type:String, default:''},
  rules: {type:String, default:''},
  venue: {type:String, default:''},
  poster: {type:String, default:''},
  problemStatement:{type:String, default:''},
  paylink:{type:String, default:''},
  contact:{type:String, default:''},
  active: Boolean,
  eventCategory: {type: mongoose.Schema.Types.ObjectId, ref:'EventCategory'},
  registered:[{user:{type:mongoose.Schema.Types.ObjectId,ref:'User'}}]
});

export default mongoose.model('Event', EventSchema);
