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
  attachment: String,
  active: Boolean
});

export default mongoose.model('Event', EventSchema);
