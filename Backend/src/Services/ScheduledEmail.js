import ScheduledEmail from '../model/ScheduledEmail/index.js';
import { sendBulkEmails } from './EmailService.js'
import moment from 'moment-timezone';

export const scheduleEmail = async (senderEmail, emailAddresses, templateId, scheduledAt, timeZone) => {
  try {
    const localDateTime = moment.tz(scheduledAt, timeZone);
    console.log('Local DateTime:', localDateTime.format());
    const utcScheduledAt = localDateTime.utc().toDate();
    console.log('UTC ScheduledAt:', utcScheduledAt);

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
  } catch (error) {
    console.error('Error scheduling email:', error);
    throw error;
  }
};

export const getScheduledEmails = async () => {
  try {
    const scheduledEmails = await ScheduledEmail.find({ status: 'scheduled' });
    return scheduledEmails;
  } catch (error) {
    console.error('Error retrieving scheduled emails:', error);
    throw error;
  }
};

export const updateScheduledEmailStatus = async (id, status) => {
  try {
    const updatedEmail = await ScheduledEmail.findByIdAndUpdate(id, { status }, { new: true });
    return updatedEmail;
  } catch (error) {
    console.error('Error updating email status:', error);
    throw error;
  }
};

const scheduleEmails = async () => {
  try {
    const scheduledEmails = await getScheduledEmails();

    for (const scheduledEmail of scheduledEmails) {
      if (scheduledEmail.scheduledAt <= new Date()) {
        await sendBulkEmails(scheduledEmail.emailAddresses, scheduledEmail.templateId, scheduledEmail.senderEmail);
        await updateScheduledEmailStatus(scheduledEmail._id, 'sent');
      }
    }
  } catch (error) {
    console.error('Error scheduling emails:', error);
  }
};

setInterval(scheduleEmails, 60000); // Check every minute
