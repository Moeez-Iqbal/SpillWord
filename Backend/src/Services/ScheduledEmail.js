import ScheduledEmail from '../model/ScheduledEmail/index.js';
import { sendBulkEmails } from './EmailService.js'
import moment from 'moment-timezone';

export const scheduleEmail = async (senderEmail, emailAddresses, templateId, scheduledAt, timeZone) => {
  const localDateTime = moment.tz(scheduledAt, timeZone);
  const utcScheduledAt = localDateTime.utc().toDate();

  const scheduledEmail = new ScheduledEmail({
    senderEmail,
    emailAddresses,
    templateId,
    scheduledAt: utcScheduledAt,
    timeZone,
    status: 'scheduled',
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
  const scheduledEmails = await getScheduledEmails();

  for (const scheduledEmail of scheduledEmails) {
    if (scheduledEmail.scheduledAt <= new Date()) {
      await sendBulkEmails(scheduledEmail.emailAddresses, scheduledEmail.templateId, scheduledEmail.senderEmail);
      await updateScheduledEmailStatus(scheduledEmail._id, 'sent');
    }
  }
};

setInterval(scheduleEmails, 60000); // Check every minute
