// sendBulkEmailsController.js
import multer from 'multer';
import path from 'path';
import Template from '../../model/Template/index.js';
import User from '../../model/User/index.js';
import { sendBulkEmails } from '../../Services/EmailService.js';
import { scheduleEmail } from '../../Services/ScheduledEmail.js';
import Batch from '../../model/Batch/index.js';
import moment from 'moment-timezone';
import upload from '../../middleware/multer/index.js';


const calculateRequiredCredits = (emailsToSend) => {
  return Math.ceil(emailsToSend / 100);
};

const deductCreditsAndUpdateEmails = async (user, totalEmailsToSend) => {
  user.remainingEmails -= totalEmailsToSend;

  while (user.remainingEmails < 0 && user.credits > 0) {
    user.credits -= 1;
    user.remainingEmails += 100;
  }

  if (user.remainingEmails < 0) {
    user.remainingEmails = 0;
  }

  await user.save();
};

export const sendBulkEmailsController = (req, res) => {
  upload.array('attachments', 10)(req, res, async (err) => {
    console.log('Received request body:', req.body);
    console.log('Received files:', req.body.attachments);

    if (err instanceof multer.MulterError) {
      console.error('Multer Error:', err);
      return res.status(500).json({ msg: 'Error uploading files', error: err.message });
    } else if (err) {
      console.error('Unknown Error:', err);
      return res.status(500).json({ msg: 'Unknown error uploading files', error: err.message });
    }

    try {
      const { senderEmail, selectedEmails, templateId, scheduledAt, timeZone, subject, body, ccEmails, bccEmails } = req.body;

      if (!selectedEmails || selectedEmails.length === 0) {
        return res.status(400).json({ msg: 'No email addresses selected' });
      }

      const attachments = req.files ? req.files.map(file => file.path) : [];
      
      let template;
      if (templateId) {
        template = await Template.findById(templateId).exec();
        if (!template) {
          return res.status(404).json({ msg: 'Template not found' });
        }
      }

      const user = await User.findOne({ email: senderEmail }).exec();
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      const totalEmailsToSend = selectedEmails.length;
      const requiredCredits = calculateRequiredCredits(totalEmailsToSend);

      if (user.credits < requiredCredits) {
        return res.status(400).json({ msg: 'Insufficient credits' });
      }

      if (scheduledAt && timeZone) {
        const scheduledDateTime = moment.tz(scheduledAt, timeZone);
        const scheduledAtUTC = scheduledDateTime.utc().toDate();

        try {
          const emailSubject = subject || (template ? template.subject : '');
          const emailBody = body || (template ? template.body : '');
          const emailAttachments = attachments;

          const scheduledEmail = await scheduleEmail(senderEmail, selectedEmails, templateId, scheduledAtUTC, timeZone, emailSubject, emailBody, emailAttachments, ccEmails, bccEmails);

          const batch = new Batch({
            senderEmail,
            emailAddresses: selectedEmails.map(email => email.address),
            templateId,
            sentAt: scheduledAtUTC,
          });

          await batch.save();

          await deductCreditsAndUpdateEmails(user, totalEmailsToSend);

          return res.json({ scheduledEmail, batch });
        } catch (err) {
          console.error('Error scheduling email:', err);
          return res.status(500).send('Error scheduling email');
        }
      } else {
        try {
          const emailSubject = subject || (template ? template.subject : '');
          const emailBody = body || (template ? template.body : '');
          const emailAttachments = attachments;

          await sendBulkEmails({
            emails: selectedEmails.map(email => email.address),
            templateId,
            senderEmail,
            ccEmails,
            bccEmails,
            subject: emailSubject,
            body: emailBody,
            attachments: emailAttachments,
          });

          const batch = new Batch({
            senderEmail,
            emailAddresses: selectedEmails.map(email => email.address),
            templateId,
            sentAt: new Date(),
          });

          await batch.save();

          await deductCreditsAndUpdateEmails(user, totalEmailsToSend);

          return res.json(batch);
        } catch (err) {
          console.error('Error sending bulk emails:', err);
          return res.status(500).send('Error sending bulk emails');
        }
      }
    } catch (err) {
      console.error('Server error:', err);
      return res.status(500).send('Server error');
    }
  });
};
