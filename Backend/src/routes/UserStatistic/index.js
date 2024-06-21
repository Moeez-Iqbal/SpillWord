import { Router } from 'express';
import { getUserStatistics } from '../../controller/UserStatistic/index.js';

const UserStatsRouter = Router();

UserStatsRouter.get('/user-statistics/:userId', getUserStatistics);

export default UserStatsRouter;
