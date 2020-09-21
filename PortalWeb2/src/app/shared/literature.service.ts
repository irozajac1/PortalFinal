import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Link, Literature } from './message-detail.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LiteratureService {

  readonly rootURL = "https://pdp.mibo.ba:5001/api";

  constructor(private http: HttpClient) { }

  getLiterature() {
    return this.http.get(this.rootURL + "/Literature");
  }

  deleteLiterature(id) {
    return this.http.delete(this.rootURL + "/Literature/deleteLiterature/" + id);
  }

  updateLiterature(literature, id) {
    console.log(literature);
    return this.http.put(this.rootURL + "/Literature/Update/" + id, literature);
  }

  downloadFile(id: string){
    window.open(this.rootURL + "/Literature/" + id);
  }

  postLiterature(Literature: any, files: File[], links: string[]): Observable<any> {
    var formData: FormData = new FormData();
    formData.append("Title", Literature.Title);
    formData.append("Email", localStorage.getItem("upn"));
    formData.append("Group", Literature.Group);
    for (let file of files) {
      formData.append("Files", file, file.name);
    }
    for (let link of links) {
      formData.append("Links", link);
    }

    return this.http.post(this.rootURL + "/Literature/SendLiterature", formData);
  }

  postDocument(document: any): Observable<any> {
    var formData: FormData = new FormData();
    formData.append("Title", document.Title);
    formData.append("Group", document.Group);
    formData.append("Link", document.Link);
    return this.http.post(this.rootURL + "/Documentation/sendDocumentation", formData);
  }

}

