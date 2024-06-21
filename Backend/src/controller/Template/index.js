import Template from "../../model/Template/index.js";


export const createTemplate = async (req, res) => {
  const { name, folder, tags, owner, subject, body, userId } = req.body;
  const file = req.file ? req.file.path : null;

  try {
    const template = new Template({ name, folder, tags, owner, subject, body, file, userId });
    await template.save();
    res.json(template);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
