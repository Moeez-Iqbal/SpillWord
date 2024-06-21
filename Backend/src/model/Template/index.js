// model/Template/index.js

import mongoose from 'mongoose';

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tags: { type: [String], default: [] },
  owner: { type: String, },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  file: { type: String }, // Path to the attachment file
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  totalEmails: { type: Number, default: 0 },
  delivered: { type: Number, default: 0 },
  opened: { type: Number, default: 0 },
  clicked: { type: Number, default: 0 },
});

const Template = mongoose.model('Template', TemplateSchema);

export default Template;

