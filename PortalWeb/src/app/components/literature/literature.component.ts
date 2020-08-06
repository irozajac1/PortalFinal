import { Component, OnInit } from '@angular/core';
import { LiteratureService } from 'src/app/shared/literature.service';
import { DetailService } from 'src/app/shared/detail.service';
import { Literature } from 'src/app/shared/message-detail.model';
import { faDownload, faTrash, faEdit } from "node_modules/@fortawesome/free-solid-svg-icons";
import { MatDialog } from "@angular/material";
import { EditLiteratureComponent } from '../edit-literature/edit-literature.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-literature',
  templateUrl: './literature.component.html',
  styleUrls: ['./literature.component.css']
})
export class LiteratureComponent implements OnInit {

  faDownload = faDownload;
  faTrash = faTrash;
  faEdit = faEdit;
  getEmail = "muhamed.skikic@mibo.ba";

  constructor(public LiteratureService: LiteratureService, public DetailService: DetailService, public toastr: ToastrService, public dialog: MatDialog) { }
  Literatures: Literature[];

  ngOnInit() {
    this.LiteratureService.getLiterature().subscribe(data => {
      this.Literatures = data as Literature[];
    });
  }

  delete(id) {
    this.LiteratureService.deleteLiterature(id).subscribe(data => {
      this.toastr.success("Uspješno");
      location.reload();
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      });
  }

  update(lit): void {
    const dialogRef = this.dialog.open(EditLiteratureComponent, {
      width: "800px",
      data: {
        lit
      }
    });
  }

  download(ref) {
    return this.DetailService.downloadFile(ref);
  }

}
