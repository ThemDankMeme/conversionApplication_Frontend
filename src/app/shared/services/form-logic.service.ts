import { Injectable } from '@angular/core';
import formStructure from '../../../assets/selection.json';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, retry, throwError} from "rxjs";
import AssembleRequest from "../interfaces/assembleRequest.interface";

@Injectable({
  providedIn: 'root'
})
export class FormLogicService {

  constructor(public httpClient:HttpClient) { }
  public retrieveUnits(type): Array<string>{
    return formStructure[type];
  }
  public retrieveTypes(): Array<string>{
    return Object.keys(formStructure);
  }
  public convertValue(value:any){
    let body = {
      type: value.conversionType,
      unit: value.convertFrom+'To'+value.convertTo,
      convertingValue: parseFloat(value.convertFromValue)
    }
    console.log(body);
    return this.httpClient.post<AssembleRequest>('http://3.93.62.90:8080/convert', body).pipe(retry(3), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(`Backend returned code ${error.status}, body was: , error.error`);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }




}

