// controllers/testEmailController.js
import Template from "../../model/Template/index.js";
import { sendEmail } from "../../Services/EmailService.js";

export const sendTestEmailController = async (req, res) => {
  const { senderEmail, templateId } = req.body;

  try {
    // Retrieve the template
    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ msg: 'Template not found' });
    }

    // Prepare the test email message
    const msg = {
      from: senderEmail,
      to: senderEmail,
      subject: template.subject,
      text: `${template.body}\n\nOwner: ${template.owner}\nTags: ${template.tags}`,
      html: `${template.body}<br><br>Owner: ${template.owner}<br>Tags: ${template.tags}`,
    };

    // Send the test email
    await sendEmail(msg);

    res.json({ msg: 'Test email sent successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
