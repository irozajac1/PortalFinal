import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { MatDialog } from "@angular/material";
import { AddMessageComponent } from "../add-message/add-message.component";
import { DetailService } from "../../shared/detail.service";
import { ToastrService } from "ngx-toastr";
import { CommentsComponent } from "../comments/comments.component";
import { Router } from "@angular/router";
import * as jwt_decode from "jwt-decode";
import { ApprovedMessageComponent } from "../approved-message/approved-message.component";
import { FormBuilder } from "@angular/forms";
import { first } from "rxjs/operators";
import { SearchDataService } from 'src/app/shared/search-data.service';
import {
  faTrash,
  faComment,
  faExpandAlt,
  faFileDownload,
  faDownload,
  faThumbsUp,
  faThumbsDown,
  faBell,
  faSearch,
  faBars,
  faSignOutAlt,
  faBuilding,
  faUserFriends,
  faNewspaper,
  faCalendarAlt,
  faBook,
  faFileAlt,
  faInbox
} from "node_modules/@fortawesome/free-solid-svg-icons";
import { OpenMessageComponent } from "../open-message/open-message.component";
import { MessageDetail } from 'src/app/shared/message-detail.model';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { AuthenticationService } from 'src/app/utilities/_service/authentication.service';

@Component({
  selector: "app-show-message",
  templateUrl: "./show-message.component.html",
  styleUrls: ["./show-message.component.css"]
})
export class ShowMessageComponent implements OnInit {
  faExpandAlt = faExpandAlt;
  faTrash = faTrash;
  faComment = faComment;
  faFileDownload = faFileDownload;
  faDownload = faDownload;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faBell = faBell;
  faSearch = faSearch;
  faBars = faBars;
  faSignOutAlt = faSignOutAlt;
  faBuilding = faBuilding;
  faUserFriends = faUserFriends;
  faNewspaper = faNewspaper;
  faCalendarAlt = faCalendarAlt;
  faBook = faBook;
  faFileAlt = faFileAlt;
  faInbox = faInbox;

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

  searchToggle: Boolean = false;

  messages: MessageDetail[];
  searchMessages: MessageDetail[];

  constructor(
    public dialog: MatDialog,
    public service: DetailService,
    public shareData: SearchDataService,
    public toastr: ToastrService,
    public authenticationService: AuthenticationService,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    if (window.screen.width <= 660) {
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
    let upn = decode.email; //upn za produkcijsku verziju
    this.getEmail = upn;
    localStorage.setItem("upn", upn);

    this.deleteForm = this.formBuilder.group({
      IsDeleted: "true"
    });
    this.restoreForm = this.formBuilder.group({
      IsDeleted: "false"
    });
  }

  public toggleMenu() {
    if (this.toggleSidebar == true) {
      this.toggleSidebar = false;
    }
    else {
      this.toggleSidebar = true;
    }

  }

  searchMsgs(arg) {
    this.router.navigateByUrl("/Messages");
    this.searchToggle = true;
    this.shareData.searchData = arg;
    this.search(arg);
  }

  search(searchValue) {
    var tempMsgs = [];

    console.log(searchValue);

    for (let msg of this.messages) {
      if (msg.TextMessage.includes(searchValue.trim())) {
        tempMsgs.push(msg);
      }
    }
    this.searchMessages = [];
    this.searchMessages = tempMsgs;
  }

  downloadFile(id) {
    this.service.downloadFile(id);
  }

  cancleToggleSearch() {
    this.searchToggle = false;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddMessageComponent, {
      width: "800px",
      height: "auto"
    });
  }
  openCommentDialog(id: number): void {
    console.log(id);
    let listOfComments = this.service.messages.find(
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

  checkLikedMessages(MessageId: number): Boolean {
    let Messages = this.service.messages.find(x => x.Id === MessageId);
    let Liked = Messages.UserLikeList.find(x => x.Email === 'jovicic.djordje@outlook.com');
    if (Liked != null) {
      return true;
    } else {
      return false;
    }
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

  openApprovedMessageDialog(): void {
    const dialogRef = this.dialog.open(ApprovedMessageComponent, {
      width: "800px",
      height: "600px"
    });
    this.showcountmessages = true;
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
  logout() {
    this.authenticationService.logout();
  }

  toggleSearchBar() {
    if (this.showSeachBar == false) {
      this.showSeachBar = true;
    }
    else {
      this.showSeachBar = false;
    }
  }

  onLogoClick() {
    location.reload();
  }
}
