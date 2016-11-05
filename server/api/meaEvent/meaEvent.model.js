'use strict';

import mongoose from 'mongoose';

var MeaEventSchema = new mongoose.Schema({
  name: String,
  info: String,
  location: String,
  date: Date
});

export default mongoose.model('MeaEvent', MeaEventSchema);
