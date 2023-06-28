import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AuthService, IUser} from "../service/auth/auth.service";
import {File as File2} from "../model/files";
import {AwsServiceService} from "../service/aws-service.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-move-file',
  templateUrl: './move-file.component.html',
  styleUrls: ['./move-file.component.css']
})
export class MoveFileComponent implements OnInit{
  loading: boolean;
  user: IUser;

  file!: File2;
  constructor(private router: Router,
              private dialogRef: MatDialogRef<MoveFileComponent>,
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

  addOnBlur = true;

  moveFileGroup: FormGroup = new FormGroup({
    caption: new FormControl('', [
    ])
  });
  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

  foldername: string = "";
  public ngOnInit(): void {
    this.foldername = this.file.metadata.file.split('/').slice(1, -1).join('/');
    console.log("NAPRAVLJEN JE MOVE FILE DIALOG");
    this.cognitoService.getUser()
      .then((user: any) => {
        this.user = user.attributes;
      });
  }

  async changeFilePath() {
    if (this.moveFileGroup.valid) {
      let newFilePath = this.moveFileGroup.value.newpath;
      if(newFilePath.trim == "")
      {
        newFilePath = this.file.metadata.file
      }

      const res = await this.awsService.moveFile(newFilePath, this.file.metadata.file);

      res.subscribe(
        (response) => {
          console.log('File path changed successfully');
          //this.closeDialog();
          this.snackBar.open('File path changed successfully!', "", { duration: 2000 });
          //this.router.navigate(['/all/' + newFilePath.split('/').slice(1, -1).join('/')]);
        },
        (error) => {
          console.log('Error changing file path:', error);
        }
      );
    }
  }
}
