import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const equipmentStateEnum = ["ACTIVE", "DELETED"];

const Equipment = new Schema({
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
	assetNumber: {
		type: String,
		required: true,
		trim: true,
    minLength: 12,
    maxLength: 12,
	},
  inventoryNumber: {
		type: String,
		required: true,
		trim: true,
    minLength: 12,
    maxLength: 12,
	},
  name: {
		type: String,
		required: true,
		trim: true,
    minLength: 4,
    maxLength: 64,
	},
  description: {
		type: String,
		trim: true,
    maxLength: 512,
	},
  inventoryNumber: {
		type: String,
		required: true,
		trim: true,
    minLength: 12,
    maxLength: 12,
	},
  serialNumber: {
		type: String,
		required: true,
		trim: true,
    minLength: 12,
    maxLength: 12,
	},
  financiallyResponsiblePerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
		required: true,
	},
  recipient: {
		type: String,
		trim: true,
	},
  invoiceNumber: {
		type: String,
		required: true,
		trim: true,
    minLength: 12,
    maxLength: 12,
	},
  state: {
    type: String,
    enum: equipmentStateEnum,
		required: true,
  },
  comments: {
    type: [String],
    default: [],
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
});

export default mongoose.model('Equipment', Equipment);
