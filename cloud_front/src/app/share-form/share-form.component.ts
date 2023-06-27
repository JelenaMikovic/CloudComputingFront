import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, IUser } from '../service/auth/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-share-form',
  templateUrl: './share-form.component.html',
  styleUrls: ['./share-form.component.css'],
})
export class ShareFormComponent implements OnInit {
  loading: boolean;
  user: IUser;

  constructor(
    private dialogRef: MatDialogRef<ShareFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // private awsService: AwsServiceService,
    private snackBar: MatSnackBar,
    private cognitoService: AuthService
  ) {
    this.loading = false;
    this.user = {} as IUser;
  }

  public ngOnInit(): void {
    this.cognitoService.getUser().then((user: any) => {
      this.user = user.attributes;
    });
  }

  public update(): void {
    this.loading = true;

    this.cognitoService
      .updateUser(this.user)
      .then(() => {
        this.loading = false;
      })
      .catch(() => {
        this.loading = false;
      });
  }

  shareFileGroup: FormGroup = new FormGroup({
    usernames: new FormControl(
      [], [Validators.required, Validators.minLength(1)]
    ),
  });

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  usernames: string[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our username
    if (value) {
      this.usernames.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(username: string): void {
    const index = this.usernames.indexOf(username);

    if (index >= 0) {
      this.usernames.splice(index, 1);
    }
  }

  edit(username: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove username if it no longer has a name
    if (!value) {
      this.remove(username);
      return;
    }

    // Edit existing username
    const index = this.usernames.indexOf(username);
    if (index >= 0) {
      this.usernames[index] = value;
    }
  }

  shareFile() {
    this.shareFileGroup.value.usernames = this.usernames;
    if (this.shareFileGroup.valid) {
      // Create a FormData object to send the file as the request body
      if (this.shareFileGroup.valid) {
        console.log("Valid");
        console.log(this.shareFileGroup.value.usernames);
      }
    }
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
}
