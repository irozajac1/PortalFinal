import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  faTrash,
  faEdit
} from "node_modules/@fortawesome/free-solid-svg-icons";

import { Documentation } from 'src/app/shared/message-detail.model';

import { first } from 'rxjs/operators';
import { DocumentationService } from 'src/app/shared/documentation.service';
@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {

  faTrash = faTrash;
  faEdit = faEdit;

  getEmail: any;
  deleteForm: any;
  restoreForm: any;
  mobile: boolean = false;
  Documents: Documentation[];

  constructor(
    public dialog: MatDialog,
    public service: DocumentationService,
    public toastr: ToastrService,
    // public authenticationService: AuthenticationService,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit() {

    this.service.getDocuments().subscribe(data => { this.Documents = data as Documentation[]; console.log(this.Documents) });
    // let getToken = localStorage.getItem("adal.idtoken");
    // let decode = jwt_decode(getToken);
    // let upn = decode.email; //upn za produkcijsku verziju
    // this.getEmail = upn;
    // localStorage.setItem("upn", upn);
    this.getEmail = "muhamed.skikic@mibo.ba";

    this.deleteForm = this.formBuilder.group({
      IsDeleted: "true"
    });
    this.restoreForm = this.formBuilder.group({
      IsDeleted: "false"
    });
  }


  deleteDocument(id) {
    this.service.deleteDocument2(id);
    window.location.reload();
  }



  
}
