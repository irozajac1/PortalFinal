import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule, Meetings } from './message-detail.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  readonly rootURL = "https://pdp.mibo.ba:5001/api";

  constructor(private http: HttpClient) { }

  getSchedule() {
    return this.http.get(this.rootURL + "/Meeting/GetMeetings");
  }

  deleteSchedule(id) {
    return this.http.delete(this.rootURL + "/Meeting/DeleteLink/" + id);
  }

  postSchedule(schedule: Meetings): Observable<any> {
    return this.http.post(this.rootURL + "/Meeting/PostLink", schedule);
  }
  editSch(sch, id){
    return this.http.put(this.rootURL + "/Meeting/UpdateLink/" + id, sch);
  }
}
