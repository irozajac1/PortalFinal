import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, DateAdapter, MatDialogRef } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NewsService } from 'src/app/shared/news.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {

  recvData: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
  private _adapter: DateAdapter<any>,
  private dialogRef: MatDialogRef<EditNewsComponent>,
  private newsSer: NewsService, public toastr: ToastrService) { 
    this.recvData = data;
   }

  newsForm: FormGroup;

  ngOnInit() {
    console.log(this.recvData);
    this.newsForm = this.formBuilder.group({
      Content: [this.recvData.news.Content, Validators.required],
      DateOfEvent: [this.recvData.news.DateOfEvent, Validators.required],
      Title: [this.recvData.news.Title, Validators.required],
      Link: [this.recvData.news.Link, Validators.required]
    });
  }

  onSubmitNews(news) {
    console.log(news);
    this.newsSer.editNews(news, this.data.news.Id).subscribe(res => {
      this.toastr.success("Uspješno");
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      }
    );
    this.dialogRef.close();
  }

}
