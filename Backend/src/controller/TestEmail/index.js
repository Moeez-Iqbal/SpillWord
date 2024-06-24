import { sendEmail } from "../../Services/EmailService.js";

export const sendTestEmailController = async (req, res) => {
  const senderEmail = process.env.DEFAULT_SENDER_EMAIL; // Replace with the actual sender email set in your backend

  // Destructure subject, body, owner, and tags from req.body
  const { subject, body, owner, tags } = req.body;

  if (!subject || !body) {
    return res.status(400).json({ msg: 'Please provide subject and body' });
  }

  try {
    const msg = {
      from: senderEmail,
      to: senderEmail, // Sending email to the sender for testing purpose
      subject: subject,
      text: body, // Default to body only
      html: body, // Default to body only
    };

    if (owner || tags) {
      msg.text += `\n\nOwner: ${owner || ''}\nTags: ${tags || ''}`;
      msg.html += `<br><br>Owner: ${owner || ''}<br>Tags: ${tags || ''}`;
    }

    await sendEmail(msg);

    res.json({ msg: 'Test email sent successfully' });
  } catch (err) {
    console.error('Error sending test email:', err.message);
    res.status(500).send('Server error');
  }
};
