import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UploadFormComponent } from '../upload-form/upload-form.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

    constructor(private matDialog: MatDialog, 
      ) {}

  ngOnInit() {}

  openUploadForm() {
    const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "450px"; 


      const modalDialog = this.matDialog.open(UploadFormComponent, dialogConfig);

      console.log(modalDialog);
  }
}
