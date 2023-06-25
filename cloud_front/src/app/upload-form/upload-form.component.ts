import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AwsServiceService } from '../service/aws-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar'; 
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AuthService, IUser } from '../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css'],
})
export class UploadFormComponent implements OnInit {
  loading: boolean;
  user: IUser;
  
  constructor(
    private dialogRef: MatDialogRef<UploadFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private awsService: AwsServiceService, 
    private snackBar: MatSnackBar,
    private cognitoService: AuthService,
    private Router: Router
  ) {
    this.loading = false;
    this.user = {} as IUser;
  }

  foldername: string = "";

  public ngOnInit(): void {
    this.foldername = this.Router.url.split("all")[1].substring(1);
    console.log(this.foldername);
    this.cognitoService.getUser()
    .then((user: any) => {
      this.user = user.attributes;
    });
  }

  public update(): void {
    this.loading = true;

    this.cognitoService.updateUser(this.user)
    .then(() => {
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  }

  fileToUpload?: File = undefined;
  uploadFileGroup: FormGroup = new FormGroup({
    caption: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    basicfile: new FormControl('', [
      Validators.required,
    ]),
  });

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove tag if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing tag
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }

  onFileSelected(event: any) {
    // Get the selected file from the input event
    this.fileToUpload = event.target.files.item(0);
    const file: File = event.target.files[0];
  }

  uploadFile() {
    if (this.uploadFileGroup.valid) {
      // Create a FormData object to send the file as the request body
      const formData = new FormData();
      let type = '';
      let size = 0;
      let lastModified = 0;

      if (this.fileToUpload != null) {
        formData.append('file', this.fileToUpload);
        type = this.fileToUpload.type;
        size = this.fileToUpload.size;
        lastModified = this.fileToUpload.lastModified;

        console.log(type, size, lastModified, name, this.tags);
      }

      // Send the POST request to your Lambda function
      this.awsService
        .uploadFile(type, lastModified, size, this.uploadFileGroup.value.caption, this.tags, this.fileToUpload, this.foldername)
        ?.subscribe(
          (response) => {
            console.log('File uploaded successfully');
            this.closeDialog();
            this.snackBar.open('File uploaded successfully!', "", {duration: 2000});
          },
          (error) => {
            console.log('Error uploading file:', error);
          }
        );
    }
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
}
