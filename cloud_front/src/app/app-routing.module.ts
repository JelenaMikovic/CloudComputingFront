import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from 'src/guard/LoginGuard';
import { NotLoggedInGuard } from 'src/guard/NotLoggedInGuard';
import { PreviewFileComponent } from './preview-file/preview-file.component';


const routes: Routes = [
  { path: 'registration', component: RegistrationComponent, canActivate: [LoginGuard] },
  { path: 'home', component: MainPageComponent, canActivate: [NotLoggedInGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard]}, 
  { path: 'file', component: PreviewFileComponent},
  { path: '**', component: MainPageComponent, canActivate: [NotLoggedInGuard, LoginGuard]},
  { path: '', component: MainPageComponent, pathMatch: 'full', canActivate: [NotLoggedInGuard, LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
