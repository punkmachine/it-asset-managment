import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userStateEnum = ["ACTIVE", "DELETED"];
const userRoleEnum = ['ADMIN', 'SUPERADMIN'];

const User = new Schema({
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
    minLength: 6,
    unique: true,
	},
  password: {
		type: String,
		required: true,
		trim: true,
    // maxLength: 64,
    // minLength: 6,
	},
  state: {
    type: String,
    enum: userStateEnum,
		required: true,
  },
  role: {
    type: String,
    enum: userRoleEnum,
		required: true,
  },
  avatar: {
    type: String,
  }
});

export default mongoose.model('User', User);
