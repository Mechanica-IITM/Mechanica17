'use strict';

import mongoose from 'mongoose';

var EventCategorySchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('EventCategory', EventCategorySchema);
