import { Router } from 'express';

import ruleController from './app/controllers/ruleController';

const routes = new Router();

routes.get('/rules', ruleController.index);
routes.post('/rules/:type', ruleController.store);
routes.delete('/rules/:id', ruleController.delete);

export default routes;