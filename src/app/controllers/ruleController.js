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
    
    const { type } = req.params;
    const { date, start, end } = req.body;
    const rules = await Rule.list();

    

    if(date) {

    var start_req_aux = parseISO(date+' '+start+':00.000');
    var end_req_aux = parseISO(date+' '+end+':00.000');
    
    var startH_req= parseInt( format(start_req_aux, "H"));
    var startM_req = parseInt( format(start_req_aux, "mm")); 
    var endH_req= parseInt( format(end_req_aux, "H"));
    var endM_req = parseInt( format(end_req_aux, "mm"));

  
    // Caso encontre a data cadastrada no dia específico;
    const findEspecifico = rules.find(rule =>rule.date === date && rule.type === 'specific');

    if (findEspecifico) {

      var erro = '';
      const available = rules.find(rule =>{
       if(rule.date === date && rule.type === 'specific'){
         
       
        for (let i = 0; i < rule.hours.length; i++) {
         
          let startH_base_aux = parseISO(date+' '+rule.hours[i].start+':00.000');
          let endH_base_aux = parseISO(date+' '+rule.hours[i].end+':00.000');

          var startH_base= parseInt( format(startH_base_aux, "H"));
          var startM_base= parseInt( format(startH_base_aux, "mm"));
          var endH_base= parseInt( format(endH_base_aux, "H"));
          var endM_base= parseInt( format(endH_base_aux, "mm"));

          if (startH_req !== startH_base) {
            
            erro = '';
            if (startH_req>=startH_base && startH_req<=endH_base) {

              if (startH_req === endH_base && startM_req > endM_base) {
                erro = '';
                break;
              }
              erro = 'err2';
              break;
            } else if (endH_req>=startH_base && endH_req<=endH_base)  {
              
              erro = 'err3';
              break;
            }           
            
          } else {
            erro = 'err1';
            break;
          }

        }
        
        
       }
      });

     

      if(erro === 'err1') {
       
        return res.status(401).json({ error: "Hour already exist"});

      } else if (erro === 'err2') {

        return res.status(401).json({ error: "Hour start beetwen another rule"});

      } else if (erro === 'err3') {

        return res.status(401).json({ error: "Hour end beetwen another rule"});

      }
    }
   } else {

      let ty = parseInt(type);

      if (ty === 1) {

        var findDiario = rules.find(rule => rule.type === 'daily' );

      }else if(ty === 2) {

        var findSemanal = rules.find(rule => rule.type === 'weekly');

      } 


      if (findDiario || findSemanal) {
        const update = await Rule.update(type, req.body);

        return res.json({ 
          menssage : "Successfully updated rule!",
          update
        
        });

      } 
     

   }
   



    const rule = Rule.create( type, req.body );

    return res.json(rule);
    
  }

  async delete (req, res) {

    const { id } = req.params;
    const rules = await Rule.delete(id);

    return res.json(rules);

    


  }
}

export default new ruleController();