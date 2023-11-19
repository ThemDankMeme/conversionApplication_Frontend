import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {FormModule} from "../../shared/components/form/form.module";



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
