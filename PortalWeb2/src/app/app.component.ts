import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private spinner: NgxSpinnerService) { }

  title = 'PortalAngular';

  ngOnInit() {

    let getToken = localStorage.getItem("adal.idtoken");
    let decode = jwt_decode(getToken);
    let upn = decode.upn; //upn za produkcijsku verziju
    localStorage.setItem("upn", upn);
    
      /** spinner starts on init */
      this.spinner.show();

      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 2000);
  }
}
