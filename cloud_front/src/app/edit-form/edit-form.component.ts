import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AwsServiceService } from '../service/aws-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AuthService, IUser } from '../service/auth/auth.service';
import { Router } from '@angular/router';
import { File as File2} from '../model/files'

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css'],
})
export class EditFormComponent implements OnInit {
  loading: boolean;
  user: IUser;

  file!: File2;

  constructor(private router: Router,
    private dialogRef: MatDialogRef<EditFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private awsService: AwsServiceService,
    private snackBar: MatSnackBar,
    private cognitoService: AuthService,
    private Router: Router
  ) {
    this.loading = false;
    this.user = {} as IUser;
    this.file = data.file;
  }

  foldername: string = "";

  public ngOnInit(): void {
    this.foldername = this.file.metadata.file.split('/').slice(1, -1).join('/');
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
    ])
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

  async uploadFile() {
    if (this.uploadFileGroup.valid) {
      // Create a FormData object to send the file as the request body
      const formData = new FormData();

      let caption = this.uploadFileGroup.value.caption
      if(caption.trim() == "")
      {
        caption = this.file.metadata.caption
      }
      let tags = this.tags
      if(tags.length === 0)
      {
        tags = this.file.metadata.tags
      }


      // Send the POST request to your Lambda function
      const res = await this.awsService
        .editFile(caption, tags, this.file.metadata.file);

        res.subscribe(
          (response) => {
            console.log('File changed successfully');
            this.closeDialog();
            this.snackBar.open('File changed successfully!', "", {duration: 2000});
            this.router.navigate(['/all/' + this.file.metadata.file.split('/').slice(1, -1).join('/')]);
          },
          (error) => {
            console.log('Error changing file:', error);
          }
        );
    }
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
}
