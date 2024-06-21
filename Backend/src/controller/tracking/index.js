import Template from '../../model/Template/index.js';
import User from '../../model/User/index.js';

export const trackOpen = async (req, res) => {
  const { email, templateId } = req.query;

  try {
    const template = await Template.findById(templateId);
    const user = await User.findById(template.userId);

    if (template && user) {
      template.opened = (template.opened || 0) + 1;
      user.opened = (user.opened || 0) + 1;
      await template.save();
      await user.save();
      console.log(`Open tracked for email: ${email}`);
    }
  } catch (error) {
    console.error('Error tracking open:', error);
  }

  const pixel = Buffer.from('R0lGODlhAQABAPAAAP///wAAACwAAAAAAQABAAACAkQBADs=', 'base64');
  res.writeHead(200, {
    'Content-Type': 'image/gif',
    'Content-Length': pixel.length,
  });
  res.end(pixel);
};

export const trackClick = async (req, res) => {
  const { email, templateId, url } = req.query;

  try {
    const template = await Template.findById(templateId);
    const user = await User.findById(template.userId);

    if (template && user) {
      template.clicked = (template.clicked || 0) + 1;
      user.clicked = (user.clicked || 0) + 1;
      await template.save();
      await user.save();
      console.log(`Click tracked for email: ${email}`);
    }
  } catch (error) {
    console.error('Error tracking click:', error);
  }

  res.redirect(url);
};
