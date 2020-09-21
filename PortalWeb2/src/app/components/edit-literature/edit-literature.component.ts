import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LiteratureService } from 'src/app/shared/literature.service';
import { ToastrService } from 'ngx-toastr';
import { Link } from 'src/app/shared/message-detail.model';
import { faCheck } from "node_modules/@fortawesome/free-solid-svg-icons";


@Component({
  selector: 'app-edit-literature',
  templateUrl: './edit-literature.component.html',
  styleUrls: ['./edit-literature.component.css']
})
export class EditLiteratureComponent implements OnInit {
  editLiteratureForm: FormGroup;
  recvData: any;
  Links: Link[];
  faCheck = faCheck;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public toastr: ToastrService, public LiteratureService: LiteratureService,
    private dialogRef: MatDialogRef<EditLiteratureComponent>,
  ) {
    this.recvData = data;
  }
  ngOnInit() {
    this.editLiteratureForm = new FormGroup({
      Title: new FormControl(this.recvData.lit.Title),
      Group: new FormControl(this.recvData.lit.Group),
      Links: new FormControl(this.recvData.lit.Links),
      Email: new FormControl(localStorage.getItem("upn")),
    });
    this.Links = this.recvData.lit.Links;
  }

  changeLink(link, index) {
    if (link != this.recvData.lit.Links) {
      this.Links[index].UrlLink = link;
      this.toastr.success("Uspješno ste validirali link za promjenu!");
    }
  }

  editLiterature(id) {
    this.editLiteratureForm.value.Links = null;
    this.editLiteratureForm.value.Links = this.Links;
    this.LiteratureService.updateLiterature(this.editLiteratureForm.value, id).subscribe(res => {
      this.toastr.success("Uspješno");
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      });
    this.dialogRef.close();
  }
}
