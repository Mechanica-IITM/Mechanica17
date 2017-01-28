'use strict';

import mongoose,{Schema} from 'mongoose';

var EventCategorySchema = new mongoose.Schema({
  name: String,
  info: String,
  imgURL:String,
  events: [{event:{type:Schema.Types.ObjectId,ref:'Event'}}],
  active: Boolean
});

export default mongoose.model('EventCategory', EventCategorySchema);
