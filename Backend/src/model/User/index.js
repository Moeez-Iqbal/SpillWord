import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  totalEmails: { type: Number, default: 0 },
  delivered: { type: Number, default: 0 },
  opened: { type: Number, default: 0 },
  clicked: { type: Number, default: 0 },
  credits: { type: Number }, // Adjust based on user's purchased credits
  remainingEmails: { type: Number }, // Initialize remaining emails based on credits
});

const User = mongoose.model('User', UserSchema);
export default User;
