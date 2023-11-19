import { Injectable } from '@angular/core';
import formStructure from '../../../assets/selection.json';

@Injectable({
  providedIn: 'root'
})
export class FormLogicService {

  constructor() { }
  public buildForm(type): Array<any>{
    // for (const [key, value] of Object.entries(formStructure)) {
    console.log(formStructure[type]);

    // for (const [key, value] of Object.entries(formStructure[type])) {
    //   listItems.push(key, value);
    // }
    // return formStructure[type];
    return Object.keys( formStructure[type]);



  }
}

