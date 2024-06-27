// models/Batch.js
import mongoose from 'mongoose';

const BatchSchema = new mongoose.Schema({
  senderEmail: { type: String, required: true },
  emailAddresses: { type: [String], required: true },
  templateId: { type: mongoose.Schema.Types.ObjectId, ref: 'Template'},
  sentAt: { type: Date, default: Date.now }
});

const Batch = mongoose.model('Batch', BatchSchema);
export default Batch;
