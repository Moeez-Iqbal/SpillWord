import { Router } from 'express';
import { createTemplate, getTemplates, getTemplateById, updateTemplate } from '../../controller/Template/index.js';
import upload from '../../middleware/multer/index.js';

const TemplateRouter = Router();

// Route for creating a new template
TemplateRouter.post('/create', upload.single('file'), createTemplate);

TemplateRouter.get('/gettemplates', getTemplates);

TemplateRouter.get('/gettemplate/:id', getTemplateById);

TemplateRouter.put('/updatetemplate/:id', upload.single('file'), updateTemplate);

export default TemplateRouter;
