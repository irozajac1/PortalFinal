import { Component, OnInit, Inject } from '@angular/core';
import { DetailService } from '../../shared/detail.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-approved-message',
  templateUrl: './approved-message.component.html',
  styleUrls: ['./approved-message.component.css']
})
export class ApprovedMessageComponent implements OnInit {

  constructor(public service: DetailService, public toastr: ToastrService, public dialogRef: MatDialogRef<ApprovedMessageComponent>,
              private formBuilder: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any ) { }

   approvedForm: any;
   deleteForm: any;
   recvData: any;

  ngOnInit() {
    this.service.refreshMessageList();
    this.approvedForm = this.formBuilder.group({
      IsApproved: 'true',
    });
    this.deleteForm = this.formBuilder.group({
      IsDeleted: 'true',
    });
  }

  downloadFile(id){
    this.service.downloadFile(id);
  }

  closeClick(): void {
    this.dialogRef.close();
    this.service.refreshMessageList();
   }

   onHardDelete(id){
     this.service.hardDelete(id).subscribe(res => {
      this.toastr.success("Uspješno");
      this.closeClick();
      location.reload();
    },
      err => {
        this.toastr.error("Pokušajte ponovo", "Došlo je do greške");
      });
   }

  onDelete(MessageId, TextMessage, Email, Group) {
    let deleted = {
      MessageId,
      Email,
      TextMessage,
      Group,
      IsDeleted: this.deleteForm.value.IsDeleted,
    };
    this.service.putMessageDetail(MessageId, deleted).subscribe(
      res => {
        this.service.refreshMessageList();
        location.reload();
        this.toastr.warning('Sadržaj nije odobren');

      },
      err => {
        this.toastr.error('Pokušajte ponovo', 'Došlo je do greške', );
      }
    );
  }
  approvedMessage(Id, TextMessage, Email, Group) {
    let message = {
      Id,
      Email,
      TextMessage,
      Group,
      IsApproved: true,
    };
    this.service.putMessageDetail(Id, message).subscribe(
      res => {
        this.service.refreshMessageList();
        location.reload();
        this.toastr.success('Sadržaj je odobren');
      },
      err => {
        this.toastr.error('Pokušajte ponovo', 'Došlo je do greške', );
      }
    );
  }
}
