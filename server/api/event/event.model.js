'use strict';

import mongoose from 'mongoose';

var EventSchema = new mongoose.Schema({
  name: String,
  info: String,
  startTime: Date,
  endTime: Date,
  date:Date,
  awards: String,
  faq: String,
  rules: String,
  venue: String,
  attachment: String,
  poster: String,
  problemStatement:String,
  contact:String,
  active: Boolean,
  eventCategory: {type: mongoose.Schema.Types.ObjectId, ref:'EventCategory'},
  registered:[{user:{type:mongoose.Schema.Types.ObjectId,ref:'User'}}]
});

export default mongoose.model('Event', EventSchema);
