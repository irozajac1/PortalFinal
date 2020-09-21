import { Component, OnInit, Inject, ViewChild } from "@angular/core";
import { MatDialogRef, DateAdapter } from "@angular/material";
import { NgForm, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { DetailService } from "../../shared/detail.service";
import { LiteratureService } from "../../shared/literature.service";
import { NewsService } from "../../shared/news.service";
import { ScheduleService } from '../../shared/schedule.service';
import { ToastrService } from "ngx-toastr";
import {
  faPlusSquare,
} from "node_modules/@fortawesome/free-solid-svg-icons";
import { faWindowClose } from "node_modules/@fortawesome/free-solid-svg-icons";
import { EmployeeService } from '../../shared/employee.service';
import { AuthenticationService } from 'src/app/utilities/_service/authentication.service';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: "app-add-message",
  templateUrl: "./add-message.component.html",
  styleUrls: ["./add-message.component.css"],
  providers: [DetailService]
})
export class AddMessageComponent implements OnInit {
  messageForm: FormGroup;
  documentForm: FormGroup;
  employeeForm: FormGroup;
  scheduleForm: FormGroup;
  literatureForm: FormGroup;
  newsForm: FormGroup;
  faWindowClose = faWindowClose;
  getEmail: string;
  documentFile: File;
  ArrayOfFiles: any[] = [];
  ArrayOfLinks: string[] = [];
  selectedFile: File;
  fileList: File[] = [];
  employeePicture: File;
  isAdmin: boolean = false;
  dateNow: Date = new Date();
  faPlusSquare = faPlusSquare;

  submitted = false;
  constructor(
    public dialogRef: MatDialogRef<AddMessageComponent>,
    public service: DetailService,
    public serviceEmp: EmployeeService,
    public serviceLite: LiteratureService,
    public serviceNews: NewsService,
    public serviceSch: ScheduleService,
    public toastr: ToastrService,
    private formBuilder: FormBuilder,
    private _adapter: DateAdapter<any>,
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit() {

    this.getEmail = localStorage.getItem("upn");
    this.resetForm();
    this._adapter.setLocale('hr');

    this.checkAdmin();

    this.messageForm = this.formBuilder.group({
      TextMessage: ["", Validators.required],
      Group: ["", Validators.required],
      Email: this.getEmail,
      AttachmentIds: [],
    });

    this.employeeForm = this.formBuilder.group({
      EmailEmployee: ["", Validators.required],
      Firstname: ["", Validators.required],
      Lastname: ["", Validators.required],
      Telephone: ["", Validators.required],
      StartOfWork: ["", Validators.required],
      Department: ["", Validators.required],
      Position: ["", Validators.required],
      ExtensionNumber: ["", Validators.required],
      EmployeePicture: [null, Validators.required],
    });

    this.documentForm = this.formBuilder.group({
      Title: ["", Validators.required],
      Group: ["", Validators.required],
      Link: ["", Validators.required]
    });

    this.scheduleForm = this.formBuilder.group({
      Title: ["", Validators.required],
      Url: ["", Validators.required]
    });

    this.literatureForm = this.formBuilder.group({
      Title: ["", Validators.required],
      Link: ["", Validators.required],
      Group: ["", Validators.required],
      AttachmentIds: [],
    });
    this.newsForm = this.formBuilder.group({
      Content: ["", Validators.required],
      DateOfEvent: ["", Validators.required],
      Title: ["", Validators.required],
      Link: ["", Validators.required]
    });

  }

  get f() {
    return this.messageForm.controls;
  }
  closeClick(): void {
    this.dialogRef.close();
  }
  clearMessageForm() {
    this.messageForm.reset({
      TextMessage: "",
      Group: "",
      fileUpload: ""
    });
  }

  clearDocumentForm() {
    this.documentForm.reset({
      Title: "",
      Attachment: ""
    });
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }

  uploadFileSave(e) {
    if (e.length != 0) {
      this.ArrayOfFiles.push(e[0]);
    }
  }

  uploadDoc(e) {
    if (e.length != null)
      this.documentFile = e;
  }
  uploadEmployeePicture(e) {
    if (e.length != 0) {
      this.selectedFile = e[0];
    }
  }

  remove(itemToRemove) {
    for (var i = 0; i < this.ArrayOfFiles.length; i++) {
      if (this.ArrayOfFiles[i] == itemToRemove) this.ArrayOfFiles.splice(i, 1);
    }
  }

  removeEmpPic() {
    this.selectedFile = null;
  }

  removeDoc(fileToRemove) {
    if (this.documentFile == fileToRemove) this.documentFile = null;
  }

  removeLink(link) {
    for (var i = 0; i < this.ArrayOfLinks.length; i++) {
      if (this.ArrayOfLinks[i] == link) this.ArrayOfLinks.splice(i, 1);
    }
  }

  checkAdmin() {
    if (this.getEmail == "muhamed.skikic@mibo.ba" || this.getEmail == "almedina.karalic@mibo.ba" || this.getEmail == "edim.hadzic@mibo.ba") {
      this.isAdmin = true;
    }
  }

  addNewLink(link) {
    this.ArrayOfLinks.push(link);
    console.log(this.ArrayOfLinks);
  }


  onSubmit() {
    this.submitted = true;
    if (this.messageForm.invalid) {
      return;
    }
    this.service.postMessageDetails(this.messageForm.value, this.ArrayOfFiles).subscribe(res => {
      this.clearMessageForm();
      this.toastr.success("Uspješno");
      this.resetForm();
      this.service.refreshMessageList();
      this.closeClick();
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      });
  }


  onSubmitSchedule() {
    // this.submitted = true;
    // if (this.scheduleForm.invalid) {
    //   return;
    // }
    this.serviceSch.postSchedule(this.scheduleForm.value).subscribe(res => {
      this.clearDocumentForm();
      this.toastr.success("Uspješno");
      this.resetForm();
      this.service.refreshMessageList();
      this.closeClick();
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      });
  }

  onSubmitEmployees() {

    if (this.employeeForm.invalid) {
      if (this.selectedFile == null) {
        this.toastr.error("Unesite sliku uposlenika!");
        return;
      }
      this.toastr.error("Popunite sva polja!");
      return;
    }

    this.serviceEmp.postUser(this.employeeForm.value, this.selectedFile).subscribe(res => {
      this.clearMessageForm();
      this.toastr.success("Uspješno");
      this.resetForm();
      this.service.refreshMessageList();
      this.closeClick();
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      });
  }

  onSubmitLiterature() {
    this.serviceLite.postLiterature(this.literatureForm.value, this.ArrayOfFiles, this.ArrayOfLinks).subscribe(res => {
      this.clearMessageForm();
      this.toastr.success("Uspješno");
      this.resetForm();
      this.service.refreshMessageList();
      this.closeClick();
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      });
    this.ArrayOfLinks = [];
  }

  onSubmitNews() {

    if (this.newsForm.value.DateOfEvent.getTime() < this.dateNow.getTime()) {
      this.toastr.error("Unesite validan datum");
      return;
    }
    this.serviceNews.postNews(this.newsForm.value).subscribe(res => {
      this.clearMessageForm();
      this.toastr.success("Uspješno");
      this.resetForm();
      this.closeClick();
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      });
  }

  onSubmitDocument(arg) {
    this.serviceLite.postDocument(arg).subscribe(res => {
      this.clearMessageForm();
      this.toastr.success("Uspješno");
      this.resetForm();
      this.closeClick();
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      });
  }

}
