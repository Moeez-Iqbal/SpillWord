import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  totalEmails: { type: Number, default: 0 },
  delivered: { type: Number, default: 0 },
  opened: { type: Number, default: 0 },
  clicked: { type: Number, default: 0 },
  credits: { type: Number, default: 0 }, // Adjust based on user's purchased credits
  remainingEmails: { type: Number, default: 0 }, // Initialize remaining emails based on credits
  dailyEmailsSent: {type: Number,default: 0},
  lastEmailSentDate: {type: Date,default: null},
  subscriptionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription' },
});

const User = mongoose.model('User', UserSchema);
export default User;
