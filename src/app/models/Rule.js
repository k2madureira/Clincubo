import { parseISO, format, isEqual, isBefore, isAfter } from 'date-fns';
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
      
      for (let i = 0; i < rules_obj.length; i++) {
        localRules.push(rules_obj[i]);
      }  
    }

    }});

    this.rules = localRules;
  }

  list() {

    let rules = [...this.rules];
   

    rules.forEach(rule => {
      let date = rule.date;

      if(date) {
        let aux = parseISO(date+' '+'00:00:00.000');
            aux = format(aux, "dd-MM-yyyy");
            rules.date = aux;
            
      }
    });

    
    return rules;
  }

  period(data){

    // 

    const { date1: since, date2: until } = data;


    let [sinceDay, sinceMonth, sinceYear] = since.split("-"); // Posso dar um join aqui?
    let [untilDay,untilMonth,  untilYear] = until.split("-"); 

    let date1_aux = sinceYear+'-'+sinceMonth+'-'+sinceDay;
    let date2_aux = untilYear+'-'+untilMonth+'-'+untilDay;;

    let rules = [...this.rules]; 
    let rules_period = [];

    rules.forEach(rule => {
      let date = rule.date;
      

      if(date) {

         let [  Year, Month, Day ] = date.split("-"); 

         let first_date = parseISO(date1_aux+' '+'00:00:00.000'); 
         let second_date = parseISO(date2_aux+' '+'00:00:00.000');
         let aux = parseISO(date+' '+'00:00:00.000');
           

         let equal_first = isEqual(new Date(sinceYear, sinceMonth-1, sinceDay), new Date(Year, Month-1, Day));
         let equal_second = isEqual(new Date(untilYear, untilMonth-1, untilDay), new Date(Year, Month-1, Day)); 

         let before = isBefore( new Date(Year, Month-1, Day) , new Date(untilYear, untilMonth-1, untilDay));
         let after = isAfter( new Date(Year, Month-1, Day), new Date(sinceYear, sinceMonth-1, sinceDay));

         /*console.log(new Date(Year, Month-1, Day));
         console.log( new Date(sinceYear, sinceMonth-1, sinceDay));
         console.log(  new Date(untilYear, untilMonth-1, untilDay) );
         console.log(equal_first, ' ',after,' ',before,' ',equal_second);*/
         
        
         if (equal_first || after && before ||equal_second) {

           rules_period.push(rule);
         }
        
           
      }
    });

    

    return rules_period.map(r => ({...r, date: r.date.split('-').reverse().join('-')}));

  }


  create(typ ,data) {

    const { date, days, start, end } = data;

    var date_aux = date ? date: null;
    var days_aux = days ? days: []; 
    
    const types = ['specific','daily','weekly'];
    let type = types[typ];

    const findDate_esp = this.rules.find(rule =>rule.date === date_aux && rule.type === type); // específico


    if (findDate_esp) {
      this.rules.find(rule =>rule.date === date_aux && rule.type === type).hours.push({ start, end });
    } else {

      var id = this.rules.length +1;

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

    const json = JSON.stringify(this.rules);
    

    fs.writeFile(this.path, json, 'utf8', function(err) {
      if (err) throw err;
      console.log('Banco atualizado');
      }
    );

    return this.rules;
  }

  update(typ ,data) {

    const { days, start, end } = data;
   
    var days_aux = days ? days: []; 
    
    const types = ['specific','daily','weekly'];
    let type = types[typ];

    if(type === 'daily') {
      const index = this.rules.findIndex(rule => rule.type === type);
      this.rules[index].hours.start = start;
      this.rules[index].hours.end = end;

    }else if (type === 'weekly') {
      const index = this.rules.findIndex(rule => rule.type === type);
      this.rules[index].days = days_aux;
      this.rules[index].hours.start = start;
      this.rules[index].hours.end = end;
    }  

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