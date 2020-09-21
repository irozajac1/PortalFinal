import {
  Component,
  OnInit,
  Input,
  Inject,
  Pipe,
  PipeTransform
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { FormGroup, Validators, FormBuilder, NgForm } from "@angular/forms";
import { DetailService } from "../../shared/detail.service";
import { ToastrService } from "ngx-toastr";
import { CommentDetail } from "../../shared/comment-detail.model";

export interface DialogData {}

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"]
})
export class CommentsComponent implements OnInit {
  showmessage: CommentDetail[];
  showcomment: CommentDetail[];
  constructor(
    public dialogRef: MatDialogRef<CommentsComponent>,
    private formBuilder: FormBuilder,
    public service: DetailService,
    public toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.recvData = data;
  }
  get f() {
    return this.commentForm.controls;
  }

  commentForm: FormGroup;
  recvData: any;
  submitted = false;

  ngOnInit(): void {
    this.resetForm();
    this.service.getCommentDetail();
    this.service.refreshMessageList();

    this.commentForm = this.formBuilder.group({
      MessageId: this.recvData.MessageId,
      TextComment: "",
      Email: localStorage.getItem("upn")
    });
  }
  clearCommentForm() {
    this.commentForm.reset({
      TextComment: ""
    });
  }
  closeClick(): void {
    this.dialogRef.close();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }
  onSubmit(id) {
    this.submitted = true;
    if (this.commentForm.invalid) {
      return;
    }

    let tempoforma = {
      MessageId: id,
      TextComment: this.commentForm.value.TextComment,
      Email: this.commentForm.value.Email
    };

    this.service.postCommentDetail(tempoforma).subscribe(
      res => {
        this.resetForm();
        this.clearCommentForm();
        this.toastr.success("Uspješno");

        this.service.getCommentDetail();
        this.service.refreshMessageList();
        this.closeClick();
      },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      }
    );
  }
}
