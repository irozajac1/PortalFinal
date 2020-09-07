import { Component, OnInit } from '@angular/core';
import { DetailService } from 'src/app/shared/detail.service';
import { first } from 'rxjs/operators';
import { OpenMessageComponent } from '../open-message/open-message.component';
import { ApprovedMessageComponent } from '../approved-message/approved-message.component';
import { CommentsComponent } from '../comments/comments.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import {
  faTrash,
  faComment,
  faExpandAlt,
  faFileDownload,
  faDownload,
  faThumbsUp,
  faThumbsDown,
  faBook
} from "node_modules/@fortawesome/free-solid-svg-icons";
import { CommentDetail } from 'src/app/shared/comment-detail.model';
import { MessageDetail } from 'src/app/shared/message-detail.model';
import * as jwt_decode from "jwt-decode";


import { ShowMessageComponent } from 'src/app/components/show-message/show-message.component';
import { AuthenticationService } from 'src/app/utilities/_service/authentication.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  faExpandAlt = faExpandAlt;
  faTrash = faTrash;
  faComment = faComment;
  faFileDownload = faFileDownload;
  faDownload = faDownload;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faBook = faBook;

  getEmail: any;
  searchText;
  deleteForm: any;
  restoreForm: any;
  countmessages: number;
  public showcountmessages: boolean;
  mobile: boolean = false;
  showSeachBar: boolean = false;
  countlikes: number = 0;
  isLikedByUser: boolean;
  public toggleSidebar: boolean = true;

  messages: MessageDetail[];
  comments: CommentDetail[];

  isAdmin: boolean = false;

  constructor(
    public dialog: MatDialog,
    public service: DetailService,
    public toastr: ToastrService,
    public authenticationService: AuthenticationService,
    public router: Router,
    public showMsg: ShowMessageComponent,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {


    if (window.screen.width <= 600) {
      this.mobile = true;
      this.toggleSidebar = false;
    }
    this.service
      .getNotApprovedMessageCount()
      .pipe(first())
      .subscribe((data: number) => {
        this.countmessages = data;
      });
    this.service.refreshMessageList();
    this.service.getNotApprovedMessageCount();
    this.service.getDocuments();
    this.service.getAllMessages().subscribe(data => { this.messages = data as MessageDetail[] });

    let getToken = localStorage.getItem("adal.idtoken");
    let decode = jwt_decode(getToken);
    let upn = decode.upn; //upn za produkcijsku verziju
    this.getEmail = upn;
    localStorage.setItem("upn", upn);
    this.checkAdmin();
    this.deleteForm = this.formBuilder.group({
      IsDeleted: "true"
    });
    this.restoreForm = this.formBuilder.group({
      IsDeleted: "false"
    });

  }

  checkAdmin() {
    if (this.getEmail == "muhamed.skikic@mibo.ba" || this.getEmail == "almedina.karalic@mibo.ba" || this.getEmail == "edim.hadzic@mibo.ba") {
      this.isAdmin = true;
    }
  }

  search(searchValue) {
    var tempMsgs = [];
    for (let msg of this.messages) {
      if (msg.TextMessage.includes(searchValue.trim())) {
        tempMsgs.push(msg);
      }
    }
  }

  downloadFile(id) {
    this.service.downloadFile(id);
  }
  openCommentDialog(id): void {
    let listOfComments = this.messages.find(
      x => x.Id === id
    ).ListOfComments;
    const dialogRef = this.dialog.open(CommentsComponent, {
      width: "800px",
      height: "600px",
      autoFocus: false,
      data: {
        id,
        listOfComments
      }
    });
  }
  openExpandDialog(MessageId: number): void {
    let Messages = this.service.messages.find(x => x.Id === MessageId);
    const dialogRef = this.dialog.open(OpenMessageComponent, {
      width: "800px",
      data: {
        MessageId,
        Messages
      }
    });
  }

  onDelete(MessageId, TextMessage, Email, Group) {
    let deleted = {
      MessageId,
      Email,
      TextMessage,
      Group,
      IsDeleted: this.deleteForm.value.IsDeleted
    };
    this.service.putMessageDetail(MessageId, deleted).subscribe(
      res => {
        this.service.refreshMessageList();
        this.service.getNotApprovedMessageCount();
        location.reload();
        this.toastr.warning("Sadržaj nije odobren");
      },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      }
    );
  }
  onRestore(MessageId, TextMessage, Email, Group) {
    let restore = {
      MessageId,
      Email,
      TextMessage,
      Group,
      IsDeleted: this.restoreForm.value.IsDeleted
    };
    this.service.putMessageDetail(MessageId, restore).subscribe(
      res => {
        this.service.refreshMessageList();
        this.service.getNotApprovedMessageCount();
        this.toastr.success("Sadržaj je vraćen");
      },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      }
    );
  }

}
