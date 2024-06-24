import Template from '../../model/Template/index.js';
import upload from '../../middleware/multer/index.js';

export const createTemplate = async (req, res) => {
  try {
    const { name, tags, owner, subject, body, userId } = req.body;
    const file = req.file ? req.file.path : null;

    const newTemplate = new Template({
      name,
      tags,
      owner,
      subject,
      body,
      file,
      userId,
    });

    const savedTemplate = await newTemplate.save();
    res.json(savedTemplate);
  } catch (err) {
    console.error('Error creating template:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all templates
export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (err) {
    console.error('Error fetching templates:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
