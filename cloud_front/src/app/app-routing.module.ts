import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: 'registration', component: RegistrationComponent },
  { path: 'home', component: MainPageComponent },
  // { path: 'login', component: MainPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
