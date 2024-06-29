import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Template from '../model/Template/index.js';
import User from '../model/User/index.js';
import path from 'path';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (msg) => {
  try {
    const info = await transporter.sendMail(msg);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const sendBulkEmails = async ({ emails, templateId, senderEmail, ccEmails = [], bccEmails = [], subject, body, attachments = [] }) => {
  try {
    let template;
    let user;

    if (templateId) {
      template = await Template.findById(templateId).exec();
      if (!template) {
        throw new Error('Template not found');
      }
    }

    if (!senderEmail) {
      throw new Error('Sender email is not provided');
    }

    user = await User.findOne({ email: senderEmail }).exec();
    if (!user) {
      throw new Error(`User not found for email: ${senderEmail}`);
    }

    const attachmentPaths = attachments.map(file => ({ path: file }));

    for (const email of emails) {
      const msg = {
        from: process.env.SMTP_USER, // Use authenticated SMTP user
        replyTo: senderEmail, // Set reply-to to user's email
        to: email,
        cc: ccEmails,
        bcc: bccEmails,
        subject: subject || (template ? template.subject : ''),
        text: body || (template ? `${template.body}\n\nOwner: ${template.owner}\nTags: ${template.tags.join(', ')}${template.file ? `\nAttachment: ${path.resolve(template.file)}` : ''}` : ''),
        html: body || (template ? `${template.body}<br><br>Owner: ${template.owner}<br>Tags: ${template.tags.join(', ')}${template.file ? `<br><a href="cid:attachment">Attachment</a>` : ''}` : ''),
        attachments: attachmentPaths.length > 0 ? attachmentPaths : undefined,
      };

      const result = await sendEmail(msg);

      if (template) {
        template.totalEmails = (template.totalEmails || 0) + 1;
        if (result.success) {
          template.delivered = (template.delivered || 0) + 1;
        }
        await template.save();
      }

      user.totalEmails = (user.totalEmails || 0) + 1;
      if (result.success) {
        user.delivered = (user.delivered || 0) + 1;
      }

      await user.save();
    }
  } catch (error) {
    console.error('Error in sendBulkEmails:', error);
    throw error; // Propagate the error to handle it further up the call stack
  }
};
