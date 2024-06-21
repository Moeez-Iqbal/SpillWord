import { Router } from 'express';
import { createUser } from '../../controller/User/index.js';

const UserRouter = Router();


UserRouter.post('/users', createUser);

export default UserRouter;
