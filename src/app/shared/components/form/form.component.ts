import {Component, OnInit} from '@angular/core';
import {FormLogicService} from "../../services/form-logic.service";
import {FormBuilder, FormGroup} from "@angular/forms";


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
      convertFrom: ['']
    });
  }
  ngOnInit(): void {
    this.listItems = this.formLogicService.buildForm(this.formGroup.get("conversionType").value);

    this.formGroup.get('conversionType').valueChanges.subscribe((value) => {
      this.listItems = this.formLogicService.buildForm(value);
      console.log(this.listItems)
      this.formGroup.get('convertFrom').setValue(this.listItems)
    });
  }
}
