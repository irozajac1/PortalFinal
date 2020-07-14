import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Literature } from './message-detail.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiteratureService {

  readonly rootURL = "https://localhost:44390/api";

  constructor(private http: HttpClient) { }

  getLiterature() {
    return this.http.get(this.rootURL + "/Literature");
  }

  deleteLiterature(id){
    return this.http.delete(this.rootURL + "/Literature/deleteLiterature", id);
  }

  updateLiterature(){

  }

  postLiterature(Literature: any, files: File[]): Observable<any> {
    var formData: FormData = new FormData();

    formData.append("Title", Literature.Title);
    formData.append("Link", Literature.Link);
    formData.append("Email", localStorage.getItem("upn"));

    for (let file of files) {
      formData.append("Files", file, file.name);
    }

    return this.http.post(this.rootURL + "/Literature/SendLiterature", formData);
  }

}

