import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AwsServiceService } from '../service/aws-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar'; 
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { AuthService, IUser } from '../service/auth/auth.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './preview-file.component.html',
  styleUrls: ['./preview-file.component.css'],
})
export class PreviewFileComponent implements OnInit {
  
  constructor(

  ) {
  }

  public ngOnInit(): void {
    
  }
}
