import { Router } from 'express';

import ruleController from './app/controllers/ruleController';

const routes = new Router();

routes.get('/rule', ruleController.index);
routes.post('/rule', ruleController.store);

export default routes;