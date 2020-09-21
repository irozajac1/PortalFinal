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
import { AuthenticationService } from 'src/app/utilities/_service/authentication.service';
import * as jwt_decode from "jwt-decode";
import { EditDocumentationComponent } from '../edit-documentation/edit-documentation.component';
@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent implements OnInit {

  faTrash = faTrash;
  faEdit = faEdit;

  getEmail = localStorage.getItem("upn");
  deleteForm: any;
  restoreForm: any;
  mobile: boolean = false;
  Documents: Documentation[];
  isAdmin: boolean = false;

  constructor(
    public dialog: MatDialog,
    public service: DocumentationService,
    public toastr: ToastrService,
    public authenticationService: AuthenticationService,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }
  ngOnInit() {

    this.service.getDocuments().subscribe(data => { this.Documents = data as Documentation[]; console.log(this.Documents) });
    this.deleteForm = this.formBuilder.group({
      IsDeleted: "true"
    });
    this.restoreForm = this.formBuilder.group({
      IsDeleted: "false"
    });
    this.checkAdmin();
  }
  
  checkAdmin() {
    if (this.getEmail == "muhamed.skikic@mibo.ba" || this.getEmail == "almedina.karalic@mibo.ba" || this.getEmail == "edim.hadzic@mibo.ba") {
      this.isAdmin = true;
    }
  }

  deleteDocument(id) {
    this.service.deleteDocument2(id).subscribe(res => {
      this.toastr.success("Uspješno");
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      });
  }

  updateDocumentation(doc): void {
    const dialogRef = this.dialog.open(EditDocumentationComponent, {
      width: "800px",
      data: {
        doc
      }
    });
  }


}
