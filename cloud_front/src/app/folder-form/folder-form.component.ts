import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AwsServiceService } from '../service/aws-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContextMenuModel } from '../interfaces/ContextMenuModel';

@Component({
  selector: 'app-folder-form',
  templateUrl: './folder-form.component.html',
  styleUrls: ['./folder-form.component.css']
})
export class FolderFormComponent implements OnInit {
  
  constructor(
    private dialogRef: MatDialogRef<FolderFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private awsService: AwsServiceService, 
    private snackBar: MatSnackBar) {}

    createFolderGroup: FormGroup = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ])
    });

    ngOnInit() {}

    public async createFolder() {
      let path = ""
      if (this.data != "all") {
        path= this.data + "/";
      }
      if (this.createFolderGroup.valid) {
        const res = await this.awsService.createAlbum(path+ this.createFolderGroup.value.name);
        res.subscribe({
          next: (res) => {
            this.closeDialog(this.createFolderGroup.value.name);
            this.snackBar.open('Album created successfully!', "", {duration: 2000});
          },
          error: (error) => {
          }
        });
      }
    }

    public closeDialog(result?: string) {
      console.log(result);
      if (result) {
        this.dialogRef.close(result);
      } else {
        this.dialogRef.close();
      }
    }

}
