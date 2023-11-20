import {Component, OnInit} from '@angular/core';
import {FormLogicService} from "../../services/form-logic.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {lastValueFrom} from "rxjs";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{
  convertedResult : number = 0;
  listItems = [];
  conversionTypes = [];
  public formGroup: FormGroup = new FormGroup({});
  constructor(public formLogicService:FormLogicService, public formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      conversionType: ['', Validators.required],
      convertFrom: ['', Validators.required],
      convertTo: ['', Validators.required],
      convertFromValue: [null, Validators.required]
    });
  }
  ngOnInit(): void {
    this.conversionTypes = this.formLogicService.retrieveTypes();
    this.formGroup.get('conversionType').valueChanges.subscribe((value) => {
      this.listItems = this.formLogicService.retrieveUnits(value);
    });
  }
  public async formSubmit(formGroup: FormGroup){
    if(formGroup.valid) {
      if (formGroup.get('convertFrom').value != formGroup.get('convertTo').value) {
        console.log('enters', formGroup.value);
        let response: any = await lastValueFrom(this.formLogicService.convertValue(formGroup.value));
        console.log('response ', response);
        if (response.results)
          this.convertedResult = response.results;
      }
      else{
        this.convertedResult = this.formGroup.get('convertFromValue').value;
      }
    }
  }
}
