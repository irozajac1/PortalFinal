import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SearchDataService {

  invokeFirstComponentFunction = new EventEmitter();    

  constructor() { }
  searchData: string;


  onFirstComponentButtonClick() {    
    this.invokeFirstComponentFunction.emit("Portal");    
  }    
}
