import { Router } from 'express';
import { sendTestEmailController } from '../../controller/TestEmail/index.js';

const TestRouter = Router();

TestRouter.post('/sendTestEmail', sendTestEmailController);

export default TestRouter;
