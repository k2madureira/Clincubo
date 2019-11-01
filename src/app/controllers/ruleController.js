import Rule from '../models/Rule';


class ruleController {

  index (__, res) {

    const rule = Rule.list();

    return res.json(rule);
  }

  store (req, res) {
    const rule = Rule.create(req.body);
    return res.json(rule);
  }

}

export default new ruleController();