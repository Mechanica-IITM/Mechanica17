'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;
var HouseSchema = new mongoose.Schema({
  name: String,
  team: [{type:Schema.Types.ObjectId,ref:'User'}],
  commander: {type:Schema.Types.ObjectId,ref:'User'},
  totalScore:{type:Number,default:0},
  meaEvents: [{user:{type:Schema.Types.ObjectId,ref:'User'},meaEvent:{type:Schema.Types.ObjectId,ref:'MeaEvent'},score:{type:Number,default:0}}]
});

export default mongoose.model('House', HouseSchema);
