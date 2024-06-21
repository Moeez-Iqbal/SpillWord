import { Router } from 'express';
import { createTemplate, getTemplates } from '../../controller/Template/index.js';
import upload from '../../middleware/multer/index.js';

const TemplateRouter = Router();

TemplateRouter.post('/create', upload.single('file'), createTemplate);
TemplateRouter.get('/gettempelate', getTemplates);

export default TemplateRouter;
