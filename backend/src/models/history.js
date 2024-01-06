import mongoose from 'mongoose';
import { Schema } from 'mongoose';

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
  passedOn: {
		type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
		required: true,
	},
  equipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Equipment',
		required: true,
  }
});

export default mongoose.model('HistoryEquipment', HistoryEquipment);
