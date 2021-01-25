import { Router } from 'express';

import HomeController from '../controllers/HomeController';

const homeRouter = Router();
const homeController = new HomeController();

homeRouter.get('/api', homeController.index);
homeRouter.post('/api', homeController.create);
homeRouter.delete('/api/:id', homeController.delete);
homeRouter.put('/api/:id', homeController.update);
homeRouter.patch('/api/update-status', homeController.patch);

export default homeRouter;
