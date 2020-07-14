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

  constructor(
    public dialog: MatDialog,
    public service: DetailService,
    public toastr: ToastrService,
    // public authenticationService: AuthenticationService,
    public router: Router,
    private formBuilder: FormBuilder
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
    // let getToken = localStorage.getItem("adal.idtoken");
    // let decode = jwt_decode(getToken);
    // let upn = decode.email; //upn za produkcijsku verziju
    // this.getEmail = upn;
    // localStorage.setItem("upn", upn);
    this.getEmail = "muhamed.skikic@mibo.ba";

    this.deleteForm = this.formBuilder.group({
      IsDeleted: "true"
    });
    this.restoreForm = this.formBuilder.group({
      IsDeleted: "false"
    });
  }

  downloadFile(id) {
    this.service.downloadFile(id);
  }
  openCommentDialog(MessageId: number): void {
    let listOfComments = this.service.messages.find(
      x => x.MessageId === MessageId
    ).ListOfComments;
    const dialogRef = this.dialog.open(CommentsComponent, {
      width: "800px",
      height: "600px",
      autoFocus: false,
      data: {
        MessageId,
        listOfComments
      }
    });
  }

  checkLikedMessages(MessageId: number): Boolean {
    let Messages = this.service.messages.find(x => x.MessageId === MessageId);
    let Liked = Messages.UserLikeList.find(x => x.Email === 'jovicic.djordje@outlook.com');
    if (Liked != null) {
      return true;
    } else {
      return false;
    }
  }

  openExpandDialog(MessageId: number): void {
    let Messages = this.service.messages.find(x => x.MessageId === MessageId);
    const dialogRef = this.dialog.open(OpenMessageComponent, {
      width: "800px",
      data: {
        MessageId,
        Messages
      }
    });
  }

  likeMessage(MessageId: Number): any {
    this.service.likeMessage(MessageId);
  }

  dislikeMessage(MessageId: Number): any {
    this.service.likeMessage(MessageId);
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
