import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const adminStateEnum = ["ACTIVE", "DELETED"];
const adminRoleEnum = ['ADMIN', 'SUPERADMIN'];

const Admin = new Schema({
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
  firstName: {
		type: String,
		required: true,
		trim: true,
    maxLength: 64,
    minLength: 2,
	},
  lastName: {
		type: String,
		required: true,
		trim: true,
    maxLength: 64,
    minLength: 2,
	},
  login: {
		type: String,
		required: true,
		trim: true,
    maxLength: 64,
    minLength: 5,
    unique: true,
	},
  password: {
		type: String,
		required: true,
	},
  state: {
    type: String,
    enum: adminStateEnum,
		required: true,
  },
  role: {
    type: String,
    enum: adminRoleEnum,
		required: true,
  },
  avatar: {
    type: String,
  }
});

export default mongoose.model('Admin', Admin);
