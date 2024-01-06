import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const branchStateEnum = ["ACTIVE", "DELETED"];

const Branch = new Schema({
	createdDate: {
		type: String,
		required: true,
		trim: true,
	},
  updatedDate: {
		type: String,
		required: true,
		trim: true,
	},
  title: {
		type: String,
		required: true,
		trim: true,
    maxLength: 256,
    minLength: 4,
	},
  description: {
		type: String,
		trim: true,
    lowercase: true,
    maxLength: 512,
	},
  state: {
    type: String,
    enum: branchStateEnum,
		required: true,
  }
});

export default mongoose.model('Branch', Branch);
