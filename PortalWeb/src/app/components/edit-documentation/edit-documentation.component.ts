import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, DateAdapter } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DocumentationService } from 'src/app/shared/documentation.service';

@Component({
  selector: 'app-edit-documentation',
  templateUrl: './edit-documentation.component.html',
  styleUrls: ['./edit-documentation.component.css']
})
export class EditDocumentationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
  private _adapter: DateAdapter<any>,

  private docSer: DocumentationService, public toastr: ToastrService) { }

  editDocForm: FormGroup;

  ngOnInit() {
    this.editDocForm = this.formBuilder.group({
      Title: [this.data.doc.Title, Validators.required],
      Group: [this.data.doc.Group, Validators.required],
      Link: [this.data.doc.Link, Validators.required]
    });
  }

  onSubmitDoc(Id) {
    return this.docSer.editDoc(this.editDocForm.value, Id).subscribe(res => {
      this.toastr.success("Uspješno");
      location.reload();
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      }
    );
  }

}