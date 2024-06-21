import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Template from '../model/Template/index.js';
import User from '../model/User/index.js';
import path from 'path';
import fs from 'fs';

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
    console.log('Email sent successfully to', msg.to);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email to', msg.to, ':', error);
    return { success: false, error: error.message };
  }
};

export const sendBulkEmails = async (emails, templateId, senderEmail = process.env.DEFAULT_SENDER_EMAIL) => {
  try {
    const template = await Template.findById(templateId);
    const user = await User.findById(template.userId);

    if (!template || !user) {
      console.error(`Template with ID ${templateId} or User with ID ${template.userId} not found`);
      return;
    }

    const attachmentPath = template.file ? path.resolve(template.file) : null;
    const attachments = attachmentPath && fs.existsSync(attachmentPath)
      ? [{ path: attachmentPath }]
      : [];

    for (const email of emails) {
      const msg = {
        from: senderEmail,
        to: email,
        subject: template.subject,
        text: `${template.body}\n\nOwner: ${template.owner}\nTags: ${template.tags.join(', ')}${attachmentPath ? `\nAttachment: ${attachmentPath}` : ''}`,
        html: `${template.body}<br><br>Owner: ${template.owner}<br>Tags: ${template.tags.join(', ')}${attachmentPath ? `<br><a href="cid:attachment">Attachment</a>` : ''}`,
        attachments: attachments.length > 0 ? attachments : undefined,
      };

      const result = await sendEmail(msg);

      template.totalEmails = (template.totalEmails || 0) + 1;
      user.totalEmails = (user.totalEmails || 0) + 1;

      if (result.success) {
        template.delivered = (template.delivered || 0) + 1;
        user.delivered = (user.delivered || 0) + 1;
      }

      await template.save();
      await user.save();
    }
  } catch (error) {
    console.error('Error sending bulk emails:', error);
  }
};