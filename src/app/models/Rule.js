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

  list() {

    let rules = [...this.rules];

    return rules.map(r => ({...r, date: r.date? r.date.split('-').reverse().join('-') : null   }) );

  }

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