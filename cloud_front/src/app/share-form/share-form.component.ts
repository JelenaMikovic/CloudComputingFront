import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, IUser } from '../service/auth/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { AwsServiceService } from '../service/aws-service.service';

@Component({
  selector: 'app-share-form',
  templateUrl: './share-form.component.html',
  styleUrls: ['./share-form.component.css'],
})
export class ShareFormComponent implements OnInit {
  loading: boolean;
  user: IUser;
  shareFileGroup: FormGroup
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  usernames: string[] = [];

  constructor(
    private dialogRef: MatDialogRef<ShareFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private awsService: AwsServiceService,
    private snackBar: MatSnackBar,
    private cognitoService: AuthService
  ) {
    this.loading = false;
    this.user = {} as IUser;
    this.shareFileGroup = new FormGroup({
      usernames: new FormControl(
        [],
        [Validators.required, Validators.minLength(1)]
      ),
    });
  }

  public ngOnInit(): void {
    this.cognitoService.getUser().then((user: any) => {
      this.user = user.attributes;
    });
    if (this.data.type === "file") {
      for (let i of this.data.name.sharedWith)
      {
        this.usernames.push(i);
      }
      
    } else {
      this.getFoldersSharedWith();
    }
  }
  async getFoldersSharedWith() {
    const res = await this.awsService.getAlbumsSharedWith(this.data.name);
    res.subscribe({
      next: (response) => {
        console.log(response)
        this.usernames = response;
      },
      error: (error) => {
        this.snackBar.open('Error sharing folder', '', {
          duration: 2000,
        });
        console.log('Error sharing folder:', error);
      },
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

  async share() {
    this.shareFileGroup.value.usernames = this.usernames;
    if (this.shareFileGroup.valid) {
      // Create a FormData object to send the file as the request body
      const usernames = this.shareFileGroup.value.usernames;
      if (this.shareFileGroup.valid && usernames) {
        console.log('Valid');
        console.log(this.shareFileGroup.value.usernames);
        if (this.data.type === 'file'){
          this.shareFile(this.usernames);
        }
        else {
          this.shareFolder(this.usernames);
        }
      }
    }
  }
  async shareFile(usernames: any) {
    const res = await this.awsService.shareFile(this.data.name.file, usernames);
    res.subscribe({
      next: (response) => {
        console.log('File shared successfully');
        this.closeDialog();
        this.snackBar.open('File shared successfully!', '', {
          duration: 2000,
        });
      },
      error: (error) => {
        this.snackBar.open('Error sharing file', '', {
          duration: 2000,
        });
        console.log('Error sharing file:', error);
      },
    });
  }
  async shareFolder(usernames: string[]) {
    const res = await this.awsService.shareFolder(this.data.name, usernames);
    res.subscribe({
      next: (response) => {
        console.log('Folder shared successfully');
        this.closeDialog();
        this.snackBar.open('Folder shared successfully!', '', {
          duration: 2000,
        });
      },
      error: (error) => {
        this.snackBar.open('Error sharing folder', '', {
          duration: 2000,
        });
        console.log('Error sharing folder:', error);
      },
    });
  }
  
  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
}
