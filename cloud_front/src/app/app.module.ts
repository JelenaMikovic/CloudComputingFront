import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FoldersComponent } from './folders/folders.component';
import { MatMenuModule } from '@angular/material/menu';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ShareFormComponent } from './share-form/share-form.component';
import { FolderFormComponent } from './folder-form/folder-form.component';
import { PreviewFileComponent } from './preview-file/preview-file.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import {MoveFileComponent} from "./move-file/move-file.component";
import { EditFormComponent } from './edit-form/edit-form.component';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MainPageComponent,
    NavbarComponent,
    UploadFormComponent,
    EditFormComponent,
    LoginComponent,
    ContextMenuComponent,
    ShareFormComponent,
    FoldersComponent,
    FolderFormComponent,
    PreviewFileComponent,
    MoveFileComponent
  ],
  imports: [
    BrowserModule,
    NgxExtendedPdfViewerModule,
    AppRoutingModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MaterialFileInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
