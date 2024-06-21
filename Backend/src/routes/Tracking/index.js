import  { Router } from 'express';
import { trackOpen, trackClick } from '../../controller/tracking/index.js';

const TrackingRouter = Router();

TrackingRouter.get('/open', trackOpen);
TrackingRouter.get('/click', trackClick);

export default TrackingRouter;
