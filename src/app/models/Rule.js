import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
const { resolve } = require('path');
import fs from 'fs';

//import pathFile from '../config/database';

class Attendance {
  constructor() {
    this.rules = [];
    this.path = resolve(__dirname, '..','..','database','rules.json');
    this.loadJson();
  }
  
  loadJson() {

    const localRules = [];

    fs.readFile(this.path, 'utf8', function readFileCallback(err, data){
      if (err){
          console.log(err);
      } else {
      
      const rules_obj = JSON.parse(data); 
      
      for (let i = 0; i < rules_obj.length; i++) {
        localRules.push(rules_obj[i]);
      }  

    }});

    this.rules = localRules;
  }

  create(data) {

    const { type, date, hours:[ start, end] } = data;

    const rule = {
      type,
      date,
      hours:[
        start,
        end
      ]
    }; 

    this.rules.push( rule );

    const json = JSON.stringify(this.rules);
    

    fs.writeFile(this.path, json, 'utf8', function(err) {
      if (err) throw err;
      console.log('complete');
      }
    );

    return this.rules;
  }

  list() {
    return this.rules;
  }

  find() {

  }

}

export default new Attendance;