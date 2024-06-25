import moment from 'moment-timezone';
import EmailList from '../../model/EmailList/index.js';
import Template from '../../model/Template/index.js';
import Batch from '../../model/Batch/index.js';
import { sendBulkEmails } from '../../Services/EmailService.js';
import { scheduleEmail } from '../../Services/ScheduledEmail.js';

export const sendBulkEmailsController = async (req, res) => {
  const { senderEmail, emailAddresses, templateId, schedule } = req.body;

  try {
    const emailLists = await EmailList.find({ email: { $in: emailAddresses } }).exec();
    if (emailLists.length === 0) {
      return res.status(404).json({ msg: 'No email lists found for provided emails' });
    }

    const template = await Template.findById(templateId).exec();
    if (!template) {
      return res.status(404).json({ msg: 'Template not found' });
    }

    const existingEmails = emailLists.map(emailList => emailList.email);
    const allEmails = Array.from(new Set([...existingEmails, ...emailAddresses]));

    if (schedule && schedule.dateTime && schedule.timeZone) {
      const scheduledAt = moment.tz(schedule.dateTime, schedule.timeZone).utc().toDate();
      try {
        const scheduledEmail = await scheduleEmail(senderEmail, allEmails, templateId, scheduledAt, schedule.timeZone);
        
        const batch = new Batch({
          senderEmail,
          emailAddresses: allEmails,
          templateId,
          sentAt: scheduledAt,
        });

        await batch.save();
        return res.json({ scheduledEmail, batch });
      } catch (err) {
        return res.status(500).send('Error scheduling email');
      }
    } else {
      await sendBulkEmails(allEmails, templateId, senderEmail);

      const batch = new Batch({
        senderEmail,
        emailAddresses: allEmails,
        templateId,
        sentAt: new Date(),
      });

      await batch.save();
      return res.json(batch);
    }
  } catch (err) {
    return res.status(500).send('Server error');
  }
};
