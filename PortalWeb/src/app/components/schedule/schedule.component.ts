import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/shared/schedule.service';
import { Schedule } from 'src/app/shared/message-detail.model';
import {
  faTrash,
  faEdit
} from "node_modules/@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  scheduleService: ScheduleService;

  faTrash = faTrash;

  constructor(scheduleService: ScheduleService) {
    this.scheduleService = scheduleService;
  }

  getEmail: string;

  Schedules: Schedule[];

  ngOnInit() {
    this.getEmail = "muhamed.skikic@mibo.ba";
    return this.scheduleService.getSchedule().subscribe(data => this.Schedules = data as Schedule[]);
  }

  deleteMeeting(id) {
    return this.scheduleService.deleteSchedule(id);
  }




}
