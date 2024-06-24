import mongoose from 'mongoose';

const TemplateSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the template
  tags: { type: [String], default: [] }, // Array of tags associated with the template
  owner: { type: String }, // Owner of the template
  subject: { type: String, required: true }, // Subject of the email template
  body: { type: String, required: true }, // Body content of the email template
  file: { type: String }, // Path to the attachment file (if any)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who owns the template
  totalEmails: { type: Number, default: 0 }, // Total number of emails sent using this template
  delivered: { type: Number, default: 0 }, // Number of emails delivered successfully
  opened: { type: Number, default: 0 }, // Number of times emails were opened
  clicked: { type: Number, default: 0 }, // Number of times links in emails were clicked
});

const Template = mongoose.model('Template', TemplateSchema);

export default Template;
