import { isEqual, isBefore, isAfter } from 'date-fns';
const { resolve } = require('path');
import fs from 'fs';

import pathFile from '../config/database';

class Rule {
  constructor() {
    this.rules = [];
    this.path = resolve(__dirname, '..','..','database', pathFile.db); 
    this.loadJson();
  }
  

  /**
 * @api loadJson()
 * @apiGroup Rule
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

  loadJson() {

    const localRules = [];

    fs.readFile(this.path, 'utf8', function readFileCallback(err, data){
      if (err){
          console.log(err);
      } else {
      
    if(data) {
      const rules_obj = JSON.parse(data); 
      rules_obj.map(rule => localRules.push(rule));
    }

    }});

    this.rules = localRules;
  }


   /**
 * @api list()
 * @apiGroup Rule
 *
 * 
 * @apiSuccess {Array} Lists all rules stored in the constructor rules variable
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
 *            "start": "05:00",
 *            "end": "06:05"
 *          }
 *        ]
 *      }
 *     ]
 *    
 *
 */

  list() {

    let rules = [...this.rules];

    return rules.map(r => ({...r, date: r.date? r.date.split('-').reverse().join('-') : null   }) );

  }

   /**
 * @api period()
 * @apiGroup Rule
 *
 * @apiParam {Date} Using the query. Fild1 (since) => '01-11-2019'; Fild2 (until) => '10-11-2019';
 * @apiSuccess {Array} Lists all rules in a given period;
 * 
 * @apiSuccessExample {json} 
 *    HTTP/1.1 200 OK
 *    [
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

  period(data){

    
    const { since , until } = data;

    const [sinceDay, sinceMonth, sinceYear] = since.split("-"); 
    const [untilDay,untilMonth,  untilYear] = until.split("-"); 

    const rules = [...this.rules]; 
    let rules_period = [];

    rules.forEach(rule => {
      let date = rule.date;
      

      if(date) {

         const [  Year, Month, Day ] = date.split("-"); 

         const equal_first = isEqual(new Date(sinceYear, sinceMonth-1, sinceDay), new Date(Year, Month-1, Day));
         const equal_second = isEqual(new Date(untilYear, untilMonth-1, untilDay), new Date(Year, Month-1, Day)); 

         const before = isBefore( new Date(Year, Month-1, Day) , new Date(untilYear, untilMonth-1, untilDay));
         const after = isAfter( new Date(Year, Month-1, Day), new Date(sinceYear, sinceMonth-1, sinceDay));

         if (equal_first || after && before ||equal_second) {

           rules_period.push(rule);
         }
        
           
      }
    });


    return rules_period.map(r => ({...r, date: r.date.split('-').reverse().join('-')}));

  }


  /**
 * @api create()
 * @apiGroup Rule
 *
 * @apiParam {string} type > query.params (/rules/:type);
 * @apiParam {Date} date  > 'YYYY-MM-DD';
 * @apiParam {Array} days > [ 'Monday', 'Friday' ];
 * @apiParam {string} start >  09:00;
 * @apiParam {string} end > 10:00;
 * @apiSuccess {Array} Lists all rules;
 * 
 * @apiSuccessExample {json} 
 *    HTTP/1.1 200 OK
 *    [
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
 *      }
 *     ]
 *    
 *
 */
  create(type ,data) {

    const { date, days, start, end } = data;

    var date_aux = date || null;
    var days_aux = days || []; 
    
    const findDate_specific = this.rules.find(rule =>rule.date === date_aux && rule.type === type); // specific


    if (findDate_specific) {
      this.rules.find(rule =>rule.date === date_aux && rule.type === type).hours.push({ start, end });
    } else {

      const id = this.rules[ this.rules.length - 1 ].id +1;

      const rule = {
        id,
        type,
        date: date_aux,
        days: days_aux,
        hours:[{
          start,
          end
        }]
      }; 
  
      this.rules.push( rule );

    }

    const strJson = JSON.stringify(this.rules);
    

    fs.writeFile(this.path, strJson, 'utf8', function(err) {
      if (err) throw err;
      console.log('Banco atualizado');
      }
    );

    return this.rules;
  }

  /**
 * @api  update()
 * @apiGroup Rule
 *
 * @apiParam {Array} days > [ 'Monday', 'Friday' ];
 * @apiParam {string} start > 09:00;
 * @apiParam {string} end > 10:00;
 * @apiSuccess {Array} Lists all rules;
 * 
 * @apiSuccessExample {json} 
 *    HTTP/1.1 200 OK
 *    [
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
 *      }
 *     ]
 *    
 *
 */

  update(type ,data) {

    const { days, start, end } = data;
    var days_aux = days || []; 
    const index = this.rules.findIndex(rule => rule.type === type);

    this.rules[index].days = days_aux;
    this.rules[index].hours[0].start = start;
    this.rules[index].hours[0].end = end;
 

    const strJson = JSON.stringify(this.rules);
    

    fs.writeFile(this.path, strJson, 'utf8', function(err) {
      if (err) throw err;
      console.log('Banco atualizado');
      }
    );

    return this.rules;

  }

   /**
 * @api  delete()
 * @apiGroup Rule
 *
 * @apiParam {Number} id > 3;
 * @apiSuccess {Array} Lists all rules;
 * 
 * @apiSuccessExample {json} 
 *    HTTP/1.1 200 OK
 *    [
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
 *      }
 *     ]
 *    
 *
 */

  delete(id) {

    const rules = this.rules;

    const index = rules.findIndex(rule => rule.id === parseInt(id));
    this.rules.splice(index, 1);

    const json = JSON.stringify(this.rules);
    

    fs.writeFile(this.path, json, 'utf8', function(err) {
      if (err) throw err;
      console.log('Banco atualizado');
      }
    );

    return this.rules;


  }

  

}

export default new Rule;