const { parseISO, format } = require('date-fns');
const Rule = require('../models/Rule');


class ruleController {


  /**
 * @api index()
 * @apiGroup ruleController
 *
 * @apiSuccess {Array} Loads all rules stored in the database.
 * 
 * @apiSuccessExample {json} 
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "id": 1,
 *        "type": "daily",
 *        "date": null,
 *        "days": [],
 *        "hours": [
 *         {
 *            "start": "08:00",
 *            "end": "10:05"
 *          }
 *        ]
 *      }
 *     ]
 *    
 *
 */

  async index (__, res) {

    const rules = await Rule.list();

    return res.json(rules);
  }

  /**
 * @api preriod()
 * @apiGroup ruleController
 *
 * @apiSuccess {Array} List all period rules.
 * 
 * @apiSuccessExample {json} 
 *    HTTP/1.1 200 OK
 *     [
 *      {
 *        "id": 2,
 *        "type": "specific",
 *        "date": 01-11-2019,
 *        "days": [],
 *        "hours": [
 *         {
 *            "start": "05:00",
 *            "end": "06:05"
 *          },
 *          {
 *            "start": "06:20",
 *            "end": "07:00"
 *          }
 *        ]
 *      },
 * 
 *       {
 *        "id": 2,
 *        "type": "specific",
 *        "date": 10-11-2019,
 *        "days": [],
 *        "hours": [
 *         {
 *            "start": "05:00",
 *            "end": "06:05"
 *          },
 *          {
 *            "start": "06:20",
 *            "end": "07:00"
 *          }
 *        ]
 *      }
 *     ]
 *    
 *
 */

  async period (req, res) {

    try {
      const rules = Rule.period(req.query);

      res.json(rules);
      
    } catch (err) {
      if(err) return res.status(500).json({ error: err.message})
    }
   
  }  

  /**
 * @api store()
 * @apiGroup ruleController
 *
 * @apiSuccess {Array}Save rule in database.
 * 
 * @apiSuccessExample {json} 
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "id": 1,
 *        "type": "daily",
 *        "date": null,
 *        "days": [],
 *        "hours": [
 *         {
 *            "start": "08:00",
 *            "end": "10:05"
 *          }
 *        ]
 *      }
 *     ]
 *    
 *
 */

  async store (req, res) {
    
    const types = ['specific','daily','weekly'];
    const { type } = req.params;
    const { date, start, end } = req.body;

   try { 
    const Rules = await Rule.list();

    const rules = Rules.map(r => ({...r, date: r.date? r.date.split('-').reverse().join('-') : null   }) );

    
    const verifyType = types.find(r => r === type);

    if(!verifyType) {
      return res.status(401).json({ Error: `Type ${type} wrong. Please try using one of these [ `+types.map(r => r)+` ]`});
    }

  if(date) {

    var start_req_aux = parseISO(date+' '+start+':00.000');
    var end_req_aux = parseISO(date+' '+end+':00.000');
    
    var startH_req= parseInt( format(start_req_aux, "H"));
    var startM_req = parseInt( format(start_req_aux, "mm")); 
    var endH_req= parseInt( format(end_req_aux, "H"));
    var endM_req = parseInt( format(end_req_aux, "mm"));

    // If find the date registered on the specific day;
    const findSpecific= rules.find(rule =>rule.date === date && rule.type === 'specific');

    if (findSpecific) {

      var err = '';
      rules.find(rule =>{

        if(rule.date === date && rule.type === 'specific'){
         
          for (let hour of rule.hours) {
          
            let startH_base_aux = parseISO(date+' '+hour.start+':00.000');
            let endH_base_aux = parseISO(date+' '+hour.end+':00.000');

            var startH_base= parseInt( format(startH_base_aux, "H"));
            var startM_base= parseInt( format(startH_base_aux, "mm"));
            var endH_base= parseInt( format(endH_base_aux, "H"));
            var endM_base= parseInt( format(endH_base_aux, "mm"));

            if (startH_req !== startH_base) {
              
              err = '';
              if (startH_req>=startH_base && startH_req<=endH_base) {

                if (startH_req === endH_base && startM_req > endM_base) {
                  break;
                }
                err = 'Hour start beetwen another rule';
                break;
              } else if (endH_req>=startH_base && endH_req<=endH_base)  {
                
                err = 'Hour end beetwen another rule';
                break;
              }           
              
            } else {
              err = 'Hour already exist';
              break;
            }

          }
        }
      });

    
      if(err) { 
        return res.status(401).json({ error: err });
      }


    }
    
  } else {

      const findTypes = rules.find(rule => rule.type === type );

      if (findTypes) {
        const update = await Rule.update(type, req.body);

        return res.json({ 
          menssage : "Successfully updated rule!",
          update
        
        });
      } 
     
  }

    const rule = Rule.create( type, req.body );
    return res.json({
      status: 'Success',
      rule
    });

  } catch (err) {
    if(err) return res.status(500).json({ error: err.message})
  }
    
  }

  /**
 * @api delete()
 * @apiGroup ruleController
 *
 * @apiSuccess {Array} Delete rule in database.
 * 
 * @apiSuccessExample {json} 
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "id": 1,
 *        "type": "daily",
 *        "date": null,
 *        "days": [],
 *        "hours": [
 *         {
 *            "start": "08:00",
 *            "end": "10:05"
 *          }
 *        ]
 *      }
 *     ]
 *    
 *
 */

  async delete (req, res) {

    const { id } = req.params;

    try {
      const rules = await Rule.delete(id);
      return res.json(rules);

    } catch (err) {
      if(err) return res.status(500).json({ error: err.message})
    }

    

  }
}

module.exports = new ruleController();