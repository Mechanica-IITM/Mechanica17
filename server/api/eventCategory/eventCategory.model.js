'use strict';

import mongoose from 'mongoose';

var EventCategorySchema = new mongoose.Schema({
  name: String,
  info: String,
  events: [{event:{type:Schema.Types.ObjectId,ref:'Event'}}],
  active: Boolean
});

export default mongoose.model('EventCategory', EventCategorySchema);
