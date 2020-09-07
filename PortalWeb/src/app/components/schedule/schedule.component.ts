import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/shared/schedule.service';
import { Schedule } from 'src/app/shared/message-detail.model';
import {
  faTrash,
  faEdit
} from "node_modules/@fortawesome/free-solid-svg-icons";
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from "jwt-decode";
import { EditScheduleComponent } from '../edit-schedule/edit-schedule.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  scheduleService: ScheduleService;

  faTrash = faTrash;
  faEdit = faEdit;
  getEmail = localStorage.getItem("upn");

  constructor(public toastr: ToastrService, scheduleService: ScheduleService, public dialog: MatDialog,
    ) {
    this.scheduleService = scheduleService;
  }

  Schedules: Schedule[];
  isAdmin: boolean = false;

  ngOnInit() {
    this.checkAdmin();
    return this.scheduleService.getSchedule().subscribe(data => this.Schedules = data as Schedule[]);
  }

  deleteMeeting(id) {
    return this.scheduleService.deleteSchedule(id).subscribe(data => {
      this.toastr.success("Uspješno");
      location.reload();
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      });
  }

  updateSchedule(sch){
    const dialogRef = this.dialog.open(EditScheduleComponent, {
      width: "800px",
      data: {
        sch
      }
    });
  }

  checkAdmin() {
    if (this.getEmail == "muhamed.skikic@mibo.ba" || this.getEmail == "almedina.karalic@mibo.ba" || this.getEmail == "edim.hadzic@mibo.ba") {
      this.isAdmin = true;
    }
  }

}
