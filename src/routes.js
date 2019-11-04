const express = require('express');

const ruleController = require('./app/controllers/ruleController');

const routes = express.Router();

routes.get('/',  function(req, res){
  res.redirect('/rules');
});
routes.get('/rules', ruleController.index);
routes.get('/rules/period', ruleController.period);
routes.post('/rules/:type', ruleController.store);
routes.delete('/rules/:id', ruleController.delete);

export default routes;