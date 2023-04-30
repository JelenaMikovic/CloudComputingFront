import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatIconModule} from '@angular/material/icon'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './registration/registration.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarRegisteredComponent } from './navbar-registered/navbar-registered.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UploadFormComponent } from './upload-form/upload-form.component';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { MaterialFileInputModule } from 'ngx-material-file-input';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MainPageComponent,
    NavbarComponent,
    NavbarRegisteredComponent,
    UploadFormComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
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
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
