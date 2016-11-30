'use strict';

import mongoose, {Schema} from 'mongoose';

var MeaEventSchema = new mongoose.Schema({
  name: String,
  info: String,
  location: String,
  users:[{user:{type:Schema.Types.ObjectId,ref:'User'},score:Number}],
  date: Date
});

export default mongoose.model('MeaEvent', MeaEventSchema);
