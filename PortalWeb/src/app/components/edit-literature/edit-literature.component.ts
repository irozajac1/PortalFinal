import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LiteratureService } from 'src/app/shared/literature.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-literature',
  templateUrl: './edit-literature.component.html',
  styleUrls: ['./edit-literature.component.css']
})
export class EditLiteratureComponent implements OnInit {
  editLiteratureForm: FormGroup;
  recvData: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public toastr: ToastrService, public LiteratureService: LiteratureService
  ) {
    this.recvData = data;
    console.log(data);
  }
  ngOnInit() {
    this.editLiteratureForm = new FormGroup({
      Title: new FormControl(this.recvData.lit.Title),
      Group: new FormControl(this.recvData.lit.Group),
      Link: new FormControl(this.recvData.lit.Link),
      Email: new FormControl(this.recvData.lit.Email),
    }
    );
  }

  editLiterature(id) {
    return this.LiteratureService.updateLiterature(this.editLiteratureForm.value, id).subscribe(res => {
      this.toastr.success("Uspješno");
      location.reload();
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      });
  }
}
