import { Injectable } from "@angular/core";
import { MessageDetail, Employee, Document, AttachmentList, LikeRequest, Schedule } from "./message-detail.model";
import { CommentDetail } from "./comment-detail.model";
import { HttpClient, HttpHeaders, HttpEvent } from "@angular/common/http";
import { fromEvent, from, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class DetailService {
  fromDataMessage: MessageDetail;
  fromDataComment: CommentDetail;
  // readonly rootURL = "https://pdp.mibo.ba:44390/api";
  readonly rootURL = "https://localhost:5001/api";
  messages: MessageDetail[];
  comments: CommentDetail[];
  listFOrmData: any[] = [];
  employee: Employee[];
  document: Document[];
  schedule: Schedule;
  likeRequestValue: LikeRequest;
  constructor(private http: HttpClient) { }

  postMessageDetails(
    fromDataMessage: MessageDetail,
    files: Array<File>
  ): Observable<any> {

    var formData: FormData = new FormData();

    for (let file of files) {
      formData.append("Attachments", file, file.name);
    }
    formData.append("TextMessage", fromDataMessage.TextMessage);
    formData.append("Email", fromDataMessage.Email);
    formData.append("Group", fromDataMessage.Group);

    return this.http.post(this.rootURL + "/Messages/SendMessage", formData);
  }

  postdocument(formDataDocument: Document, file: File): Observable<any> {
    var formData: FormData = new FormData();

    formData.append("Title", formDataDocument.Title);
    if (file[0] != null) {
      formData.append("Attachment", file[0], file[0].name);
    }
    return this.http.post(this.rootURL + "/Messages/PostDocument", formData);

  }

  postSchedule(formDataDocument): Observable<any> {
    this.schedule.Url = formDataDocument.Link;
    return this.http.post(this.rootURL + "/Meeting/PostLink", this.schedule);
  }

  downloadFile(id: string) {
    window.open(this.rootURL + "/Messages/" + id);
  }



  getAllMessages() {
    return this.http.get<any>(this.rootURL + "/Messages");
  }

  postCommentDetail(fromDataComment) {
    console.log(fromDataComment)
    return this.http.post<CommentDetail[]>(
      this.rootURL + "/Comments/" + fromDataComment.MessageId,
      fromDataComment
    );
  }
  getDocuments() {
    this.http.get(this.rootURL + "/Documentation")
      .toPromise()
      .then(res => (this.document = res as Document[]));
  }

  getCommentDetail() {
    this.http
      .get(this.rootURL + "/Comments")
      .toPromise()
      .then(res => (this.comments = res as CommentDetail[]));
  }
  deleteMessageDetail(id) {
    return this.http.delete(this.rootURL + "/Messages/" + id);
  }

  hardDelete(id) {
    return this.http.delete(this.rootURL + "/Messages/deleteMessage/" + id);
  }

  refreshMessageList() {
    return this.http
      .get<any>(this.rootURL + "/Messages")
      .toPromise()
      .then(res => (this.messages = res as MessageDetail[]));
  }

  getMessages(): Observable<MessageDetail[]> {
    return this.http.get<MessageDetail[]>(this.rootURL + "/Messages");
  }

  getNotApprovedMessageCount() {
    return this.http.get(this.rootURL + "/Messages/notapprovedmessagescount");
  }
  putMessageDetail(id, message) {
    return this.http.put(this.rootURL + "/Messages/update/" + id, message);
  }

  likeMessage(id) {
    this.likeRequestValue = {
      MessageId: id,
      Email: localStorage.getItem("upn")
    }
    return this.http.post<LikeRequest>(this.rootURL + "/Messages/LikeMessage", this.likeRequestValue).subscribe();
  }

  DislikeMessage(id) {
    // return this.http.post<LikeRequest>(this.rootURL + "/Messages/DislikeMessage", ).subscribe();
  }
}
