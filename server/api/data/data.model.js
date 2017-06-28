'use strict';

import mongoose from 'mongoose';

var DataSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Data', DataSchema);
