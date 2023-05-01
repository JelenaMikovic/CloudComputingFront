import { Component, Inject } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AwsServiceService } from '../service/aws-service.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent {

  constructor(public dialogRef: MatDialogRef<UploadFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public awsService: AwsServiceService) {}

  fileToUpload?: File = undefined;

  onFileSelected(event: any) {
    // Get the selected file from the input event
    this.fileToUpload = event.target.files.item(0);
    const file: File = event.target.files[0];
    
  }

  uploadFile() {
    // Create a FormData object to send the file as the request body
    const formData = new FormData();
    if (this.fileToUpload != null) {
    formData.append('file', this.fileToUpload);
    const type = this.fileToUpload.type;
    const size = this.fileToUpload.size;
    const lastModified = this.fileToUpload.lastModified;
    const name = this.fileToUpload.name;

    console.log(type, size, lastModified, name);
    }

    // Send the POST request to your Lambda function
    this.awsService.uploadFile(this.fileToUpload)?.subscribe(
      (response) => {
        console.log('File uploaded successfully');
        this.closeDialog();
      },
      (error) => {
        console.log('Error uploading file:', error);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
}
