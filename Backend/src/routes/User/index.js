import { Router } from 'express';
import { createUser, updateCreditsAndEmails } from '../../controller/User/index.js';

const UserRouter = Router();


UserRouter.post('/users', createUser);
UserRouter.put('/users/credits', updateCreditsAndEmails);

export default UserRouter;
