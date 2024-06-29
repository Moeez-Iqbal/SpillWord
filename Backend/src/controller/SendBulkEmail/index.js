import moment from 'moment-timezone';
import EmailList from '../../model/EmailList/index.js';
import Template from '../../model/Template/index.js';
import Batch from '../../model/Batch/index.js';
import { sendBulkEmails } from '../../Services/EmailService.js';
import { scheduleEmail } from '../../Services/ScheduledEmail.js';
import User from '../../model/User/index.js';

// Define credit conversion function
const calculateRequiredCredits = (emailsToSend) => {
  return Math.ceil(emailsToSend / 100); // Example: 1 credit per 100 emails
};

export const sendBulkEmailsController = async (req, res) => {
  const { senderEmail, selectedEmails, templateId, scheduledAt, timeZone, subject, body, attachments, ccEmails, bccEmails } = req.body;

  try {
    // Validate selected emails
    if (!selectedEmails || selectedEmails.length === 0) {
      return res.status(400).json({ msg: 'No email addresses selected' });
    }

    // Find the template based on templateId if provided
    let template;
    if (templateId) {
      template = await Template.findById(templateId).exec();
      if (!template) {
        return res.status(404).json({ msg: 'Template not found' });
      }
    }

    // Fetch user based on senderEmail
    const user = await User.findOne({ email: senderEmail }).exec();
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Calculate required credits based on total emails to send
    const totalEmailsToSend = selectedEmails.length;
    const requiredCredits = calculateRequiredCredits(totalEmailsToSend);

    // Check if user has sufficient credits
    if (user.credits < requiredCredits) {
      return res.status(400).json({ msg: 'Insufficient credits' });
    }

    // Proceed with sending or scheduling emails
    if (scheduledAt && timeZone) {
      // Schedule email logic
      const scheduledDateTime = moment.tz(scheduledAt, timeZone);
      const scheduledAtUTC = scheduledDateTime.utc().toDate();

      try {
        const scheduledEmail = await scheduleEmail(senderEmail, selectedEmails, templateId, scheduledAtUTC, timeZone, subject, body, attachments, ccEmails, bccEmails);

        // Create batch for scheduled emails
        const batch = new Batch({
          senderEmail,
          emailAddresses: selectedEmails,
          templateId,
          sentAt: scheduledAtUTC,
        });

        await batch.save();

        // Deduct credits and update remaining emails for the user
        user.remainingEmails -= totalEmailsToSend;

        if (user.remainingEmails < 0) {
          user.credits -= 1;
          user.remainingEmails += 100;
        }

        await user.save();

        return res.json({ scheduledEmail, batch });
      } catch (err) {
        console.error('Error scheduling email:', err);
        return res.status(500).send('Error scheduling email');
      }
    } else {
      // Send bulk emails immediately
      await sendBulkEmails({
        emails: selectedEmails,
        templateId,
        senderEmail,
        ccEmails,
        bccEmails,
        subject,
        body,
        attachments,
      });

      // Create batch for immediate emails
      const batch = new Batch({
        senderEmail,
        emailAddresses: selectedEmails,
        templateId,
        sentAt: new Date(),
      });

      await batch.save();

      // Deduct credits and update remaining emails for the user
      user.remainingEmails -= totalEmailsToSend;

      while (user.remainingEmails < 0) {
        user.credits -= 1;
        user.remainingEmails += 100;
      }

      await user.save();

      return res.json(batch);
    }
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).send('Server error');
  }
};
