import moment from 'moment-timezone';
import EmailList from '../../model/EmailList/index.js';
import Template from '../../model/Template/index.js';
import Batch from '../../model/Batch/index.js';
import { sendBulkEmails } from '../../Services/EmailService.js';
import { scheduleEmail } from '../../Services/ScheduledEmail.js';

export const sendBulkEmailsController = async (req, res) => {
  const { senderEmail, emailAddresses, templateId, schedule } = req.body;

  try {
    console.log('Finding email lists...');
    const emailLists = await EmailList.find({ email: { $in: emailAddresses } });
    if (emailLists.length === 0) {
      console.log('No email lists found for provided emails');
      return res.status(404).json({ msg: 'No email lists found for provided emails' });
    }

    console.log('Finding template...');
    const template = await Template.findById(templateId);
    if (!template) {
      console.log('Template not found');
      return res.status(404).json({ msg: 'Template not found' });
    }

    const existingEmails = emailLists.map(emailList => emailList.email);
    const allEmails = Array.from(new Set([...existingEmails, ...emailAddresses]));

    if (schedule && schedule.dateTime && schedule.timeZone) {
      console.log('Scheduling email...');
      const scheduledAt = moment.tz(schedule.dateTime, schedule.timeZone).utc().toDate();
      console.log(`Local DateTime: ${schedule.dateTime}`);
      console.log(`UTC ScheduledAt: ${scheduledAt.toISOString()}`);

      try {
        const scheduledEmail = await scheduleEmail(senderEmail, allEmails, templateId, scheduledAt, schedule.timeZone);
        console.log('Email scheduled successfully');
        
        const batch = new Batch({
          senderEmail,
          emailAddresses: allEmails,
          templateId,
          sentAt: scheduledAt, // Assuming sentAt is used for scheduling time as well
        });

        console.log('Saving scheduled batch...');
        await batch.save().then(() => {
          console.log('Scheduled batch saved successfully');
          res.json({ scheduledEmail, batch });
        }).catch(err => {
          console.error('Error saving scheduled batch:', err);
          res.status(500).send('Error saving scheduled batch');
        });

      } catch (err) {
        console.error('Error scheduling email:', err);
        res.status(500).send('Error scheduling email');
      }
    } else {
      console.log('Sending bulk emails now...');
      await sendBulkEmails(allEmails, templateId, senderEmail);

      console.log('Creating new batch...');
      const batch = new Batch({
        senderEmail,
        emailAddresses: allEmails,
        templateId,
        sentAt: new Date(),
      });

      console.log('Saving batch...');
      await batch.save().then(() => {
        console.log('Batch saved successfully');
        res.json(batch);
      }).catch(err => {
        console.error('Error saving batch:', err);
        res.status(500).send('Error saving batch');
      });
    }
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).send('Server error');
  }
};
