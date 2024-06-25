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

export const getTemplateById = async (req, res) => {
  try {
    const { id } = req.params;
    const template = await Template.findById(id);

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    res.json(template);
  } catch (err) {
    console.error('Error fetching template:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateTemplate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, tags, owner, subject, body, userId } = req.body;
    const file = req.file ? req.file.path : null;

    // Find the template by ID
    let template = await Template.findById(id);

    if (!template) {
      return res.status(404).json({ error: 'Template not found' });
    }

    // Check if the userId matches the template's owner
    if (template.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    // Update template fields
    template.name = name || template.name;
    template.tags = tags || template.tags;
    template.owner = owner || template.owner;
    template.subject = subject || template.subject;
    template.body = body || template.body;
    if (file) {
      template.file = file;
    }

    // Save the updated template
    const updatedTemplate = await template.save();

    res.json(updatedTemplate);
  } catch (err) {
    console.error('Error updating template:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

