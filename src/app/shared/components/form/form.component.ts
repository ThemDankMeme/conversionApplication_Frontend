import {Component, OnInit} from '@angular/core';
import {FormLogicService} from "../../services/form-logic.service";
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{

  listItems = [];
  public formGroup: FormGroup = new FormGroup({});
  constructor(public formLogicService:FormLogicService, public formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      conversionType: ['imperial'],
      convertFrom: this.formBuilder.array([])
    });
  }
  ngOnInit(): void {
    this.formLogicService.buildForm(this.formGroup.get("conversionType").value);
    this.formGroup.get('conversionType').valueChanges.subscribe((value) => {
      console.log(value);
      this.listItems = this.formLogicService.buildForm(value.conversionType);
      this.listItems.forEach((field: string) => {
        (this.formGroup.get('convertFrom') as FormArray).push(new FormControl(field))
      });
      this.listItems = this.formGroup.get('convertFrom').value;
    });

  }
}
