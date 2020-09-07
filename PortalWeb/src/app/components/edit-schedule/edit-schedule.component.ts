import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, DateAdapter } from '@angular/material';
import { ScheduleService } from 'src/app/shared/schedule.service';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
  private _adapter: DateAdapter<any>,

  private schSer: ScheduleService, public toastr: ToastrService) { }

  editSchedForm: FormGroup;

  ngOnInit() {
    this.editSchedForm = this.formBuilder.group({
      Url: [this.data.sch.Url, Validators.required]
    });
  }

  onSubmitSch(Id) {
    return this.schSer.editSch(this.editSchedForm.value, Id).subscribe(res => {
      this.toastr.success("Uspješno");
      location.reload();
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      }
    );
  }

}
