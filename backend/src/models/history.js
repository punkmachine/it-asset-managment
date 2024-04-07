import mongoose from 'mongoose';
import { Schema } from 'mongoose';

import { equipmentStateEnum } from './equipment.js';

const HistoryEquipment = new Schema({
	date: {
		type: String,
		required: true,
		trim: true,
	},
  accepted: {
		type: String,
		required: true,
		trim: true,
	},
  equipmentState: {
    type: String,
    enum: equipmentStateEnum,
    required: true,
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
		required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
		trim: true,
    minLength: 12,
    maxLength: 12,
  },
  passedOn: {
		type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
		required: true,
	},
  equipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment',
		required: true,
  }
});

export default mongoose.model('HistoryEquipment', HistoryEquipment);
