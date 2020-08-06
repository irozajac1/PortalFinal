import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
  faClock,
  faComment,
  faDownload
} from "node_modules/@fortawesome/free-solid-svg-icons";
import { DetailService } from "../../shared/detail.service";
import {
  FormGroup,
  FormControl,
  Validators,
  NgForm,
  FormBuilder
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-open-message",
  templateUrl: "./open-message.component.html",
  styleUrls: ["./open-message.component.css"]
})
export class OpenMessageComponent implements OnInit {
  faClock = faClock;
  faComment = faComment;
  recvData: any;
  addComment: boolean = false;
  addCommentForm: FormGroup;
  faDownload = faDownload;

  get f() {
    return this.addCommentForm.controls;
  }

  downloadFile(id) {
    this.service.downloadFile(id);
    console.log("kliknuo");
  }

  openCommentInput() {
    this.addComment = true;
  }

  onSubmit(id) {
    console.log(id);
    let tempoforma = {
      MessageId: id,
      TextComment: this.addCommentForm.value.TextComment,
      Email: this.addCommentForm.value.Email
    };

    if (this.addCommentForm.invalid) {
      return;
    }

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

  clearCommentForm() {
    this.addCommentForm.reset({
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

  constructor(
    public dialogRef: MatDialogRef<OpenMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: DetailService,
    public toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.recvData = data;
  }
  ngOnInit() {
    this.resetForm();
    this.service.getCommentDetail();
    this.service.refreshMessageList();

    this.addCommentForm = this.formBuilder.group({
      MessageId: this.recvData.MessageId,
      TextComment: ['', Validators.required],
      Email: localStorage.getItem("upn")
    });
  }
}
