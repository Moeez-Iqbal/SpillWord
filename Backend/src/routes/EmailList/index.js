import { Router } from 'express';
import { createEmailList, getEmailLists, getUniqueCompanies } from '../../controller/EmailList/index.js';


const EmailRouter = Router();

EmailRouter.post('/createemail', createEmailList);
EmailRouter.get('/getemail', getEmailLists);
EmailRouter.get('/unique-companies', getUniqueCompanies);

export default EmailRouter;
