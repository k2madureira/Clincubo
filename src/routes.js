import { Router } from 'express';

import ruleController from './app/controllers/ruleController';

const routes = new Router();

routes.get('/',  function(req, res){
  res.redirect('/rules');
});
routes.get('/rules', ruleController.index);
routes.get('/rules/period', ruleController.period);
routes.post('/rules/:type', ruleController.store);
routes.delete('/rules/:id', ruleController.delete);

export default routes;