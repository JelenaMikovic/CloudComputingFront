import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarRegisteredComponent } from './navbar-registered/navbar-registered.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    MainPageComponent,
    NavbarComponent,
    NavbarRegisteredComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
