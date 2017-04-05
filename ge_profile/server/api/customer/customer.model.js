'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './customer.events';

var CustomerSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  email: String,
  phone: String,
  first: String,
  last: String,
  address: String
});

registerEvents(CustomerSchema);
export default mongoose.model('Customer', CustomerSchema);
