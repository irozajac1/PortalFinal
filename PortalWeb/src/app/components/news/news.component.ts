import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/shared/news.service'
import { News } from 'src/app/shared/message-detail.model';
import { faTrash, faEdit } from "node_modules/@fortawesome/free-solid-svg-icons";
import { EditNewsComponent } from '../edit-news/edit-news.component';
import { MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  faTrash = faTrash;
  faEdit = faEdit;
  getEmail = localStorage.getItem("upn");
  isAdmin: boolean = false;


  constructor(public serviceNews: NewsService, public dialog: MatDialog, public toastr: ToastrService,
  ) { }

  News: News[];

  ngOnInit() {
    this.serviceNews.getNews().subscribe(data => this.News = data as News[]);
    this.checkAdmin();
  }

  checkAdmin() {
    if (this.getEmail == "muhamed.skikic@mibo.ba" || this.getEmail == "almedina.karalic@mibo.ba" || this.getEmail == "edim.hadzic@mibo.ba") {
      this.isAdmin = true;
    }
  }

  deleteNews(id) {
    this.serviceNews.deleteNews(id).subscribe(res => {
      this.toastr.success("Uspješno");
      location.reload();
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      }
    );
  }

  update(lit): void {
    const dialogRef = this.dialog.open(EditNewsComponent, {
      width: "800px",
      data: {
        lit
      }
    });
  }

  editNews(news): void {
    const dialogRef = this.dialog.open(EditNewsComponent, {
      width: "800px",
      data: {
        news
      }
    });
  }
}
