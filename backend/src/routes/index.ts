import { Router } from 'express';

import homeRouter from './home.routes';

const routes = Router();

routes.use('/', homeRouter);

export default homeRouter;
