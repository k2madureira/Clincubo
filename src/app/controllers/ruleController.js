import { parseISO, format } from 'date-fns';
import Rule from '../models/Rule';


class ruleController {

  async index (__, res) {

    const rules = await Rule.list();

    return res.json(rules);
  }

  async period (req, res) {
    const rules = Rule.period(req.query);

    res.json(rules);
  }  
  async store (req, res) {
    
    const types = ['specific','daily','weekly'];
    const { type } = req.params;
    const { date, start, end } = req.body;
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
    
  }

  async delete (req, res) {

    const { id } = req.params;
    const rules = await Rule.delete(id);

    return res.json(rules);

  }
}

export default new ruleController();