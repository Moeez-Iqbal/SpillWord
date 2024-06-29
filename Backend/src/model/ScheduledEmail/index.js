// model/ScheduledEmail/index.js

import mongoose from 'mongoose';

const ScheduledEmailSchema = new mongoose.Schema({
  senderEmail: {
    type: String,
    required: true,
  },
  emailAddresses: {
    type: [String],
    required: true,
  },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template'
  },
  scheduledAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['scheduled', 'sent', 'failed'],
    default: 'scheduled',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ScheduledEmail = mongoose.model('ScheduledEmail', ScheduledEmailSchema);

export default ScheduledEmail;
