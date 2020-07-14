import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News } from './message-detail.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  readonly rootURL = "https://localhost:44390/api";

  constructor(private http: HttpClient) { }

  getNews(){
    return this.http.get(this.rootURL + "/News");
  }

  postNews(news) {
    return this.http.post(this.rootURL + "/News/PostSomeNews", news);
  }

  editNews(news: News, id){
    console.log(news, id);
    return this.http.put(this.rootURL + "/News/" + id, news).subscribe();
  }

  deleteNews(id){
    return this.http.delete(this.rootURL + "/News/deleteNews", id).subscribe();
  }
}
