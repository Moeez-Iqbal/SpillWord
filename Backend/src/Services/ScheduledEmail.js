import ScheduledEmail from '../model/ScheduledEmail/index.js';
import { sendBulkEmails } from './EmailService.js';
import { sendEmail } from './EmailService.js';
import moment from 'moment-timezone';

export const scheduleEmail = async (senderEmail, emailAddresses, templateId, scheduledAt, timeZone, subject, body, attachments, ccEmails = [], bccEmails = []) => {
  const localDateTime = moment.tz(scheduledAt, timeZone);
  const utcScheduledAt = localDateTime.utc().toDate();

  const scheduledEmail = new ScheduledEmail({
    senderEmail,
    emailAddresses,
    templateId,
    scheduledAt: utcScheduledAt,
    timeZone,
    subject,
    body,
    attachments,
    status: 'scheduled',
    ccEmails,
    bccEmails,
  });

  await scheduledEmail.save();
  return scheduledEmail;
};

export const getScheduledEmails = async () => {
  return await ScheduledEmail.find({ status: 'scheduled' }).exec();
};

export const updateScheduledEmailStatus = async (id, status) => {
  return await ScheduledEmail.findByIdAndUpdate(id, { status }, { new: true }).exec();
};

const scheduleEmails = async () => {
  try {
    const scheduledEmails = await getScheduledEmails();

    for (const scheduledEmail of scheduledEmails) {
      if (scheduledEmail.scheduledAt <= new Date()) {
        await sendBulkEmails({
          emails: scheduledEmail.emailAddresses,
          templateId: scheduledEmail.templateId,
          senderEmail: scheduledEmail.senderEmail,
          ccEmails: scheduledEmail.ccEmails,
          bccEmails: scheduledEmail.bccEmails,
          subject: scheduledEmail.subject,
          body: scheduledEmail.body,
          attachments: scheduledEmail.attachments,
        });
        await updateScheduledEmailStatus(scheduledEmail._id, 'sent');
      }
    }
  } catch (error) {
    console.error('Error scheduling emails:', error);
    // Handle error appropriately, such as logging or sending notifications
  }
};

setInterval(scheduleEmails, 60000); // Check every minute
