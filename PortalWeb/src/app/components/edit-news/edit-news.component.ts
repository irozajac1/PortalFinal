import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, DateAdapter } from '@angular/material';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NewsService } from 'src/app/shared/news.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder,
  private _adapter: DateAdapter<any>,

  private newsSer: NewsService, public toastr: ToastrService) { }

  newsForm: FormGroup;

  ngOnInit() {
    this.newsForm = this.formBuilder.group({
      Content: ["", Validators.required],
      DateOfEvent: ["", Validators.required],
    });
  }

  onSubmitNews(news) {
    return this.newsSer.editNews(news, this.data.news.Id).subscribe(res => {
      this.toastr.success("Uspješno");
      location.reload();
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      }
    );;
  }

}
