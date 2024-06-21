import { Router } from 'express';
import { createEmailList, getEmailLists } from '../../controller/EmailList/index.js';


const EmailRouter = Router();

EmailRouter.post('/createemail', createEmailList);
EmailRouter.get('/getemail', getEmailLists);

export default EmailRouter;
