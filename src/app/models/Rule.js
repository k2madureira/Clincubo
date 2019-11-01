import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
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
    return this.rules;
  }

  create(typ ,data) {

    const { id, date, days, start, end } = data;
    
    const types = ['especifico','diario','semanal'];
    let type = types[typ];

    const findDate_esp = this.rules.find(rule =>rule.date === date && rule.type === type); // específico


    if (findDate_esp) {
      this.rules.find(rule =>rule.date === date && rule.type === type).hours.push({ start, end });
    } else {

      const rule = {
        id,
        type,
        date,
        days,
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