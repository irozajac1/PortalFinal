import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Documentation } from './message-detail.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {

  Documents: Documentation[];
  readonly rootURL = "https://localhost:44390/api";

  constructor(private http: HttpClient) { }

  getDocuments() {
    return this.http.get(this.rootURL + "/Documentation");
  }

  addDocument(){
        
  }

  deleteDocument2(id) {
    return this.http.delete(this.rootURL + "/Documentation/deleteDoc/" + id).subscribe();
  }
}
