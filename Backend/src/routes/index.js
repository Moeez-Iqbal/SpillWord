import { Router } from 'express';
import EmailRouter from './EmailList/index.js';
import TemplateRouter from './Template/index.js';
import SendBulkEmail from './SendBulkEmail/index.js';
import TestRouter from './TestEmail/index.js';
import UserRouter from './User/index.js';
import TrackingRouter from './Tracking/index.js';
import UserStatsRouter from './UserStatistic/index.js';


// Define your routers
const allRouter = Router();

allRouter.use(EmailRouter);
allRouter.use(TemplateRouter);
allRouter.use(SendBulkEmail);
allRouter.use(TestRouter);
allRouter.use(UserRouter);
allRouter.use('/tracking',TrackingRouter)
allRouter.use(UserStatsRouter);


export default allRouter;
