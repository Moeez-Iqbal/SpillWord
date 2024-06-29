import mongoose from 'mongoose';

const EmailListSchema = new mongoose.Schema({
  Listname: { type: String, required: true },
  email: { type: String, required: true },
  industry: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  name: { type: String, required: true },
  timezone: { type: String },
  totalYearsOfExperience: { type: Number },
  timeInCurrentRole: { type: Number },
  sequence: { type: String },
  lastActivity: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: true }, // New field for company name
});

const EmailList = mongoose.model('EmailList', EmailListSchema);
export default EmailList;
