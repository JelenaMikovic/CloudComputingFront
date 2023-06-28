import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from 'src/guard/LoginGuard';
import { NotLoggedInGuard } from 'src/guard/NotLoggedInGuard';
import { PreviewFileComponent } from './preview-file/preview-file.component';
import { InvireRegisterComponent } from './invire-register/invire-register.component';


const routes: Routes = [
  { path: 'registration', component: RegistrationComponent, canActivate: [LoginGuard] },
  { path: 'register-by-invite', component: InvireRegisterComponent, canActivate: [LoginGuard] },
  { path: 'all', component: MainPageComponent, canActivate: [NotLoggedInGuard], children: [
    { path: '', component: MainPageComponent },
    {
      path: ':album', data: { breadcrumb: { skip: true } }, children: [
        {
          path: ':album', data: { breadcrumb: { skip: true } }, children: [
            { path: ':album', component: MainPageComponent },
            { path: ':album', component: MainPageComponent, data: { breadcrumb: { skip: true } }},
            { path: ':album', component: MainPageComponent, data: { breadcrumb: { skip: true } }},
            { path: ':album', component: MainPageComponent, data: { breadcrumb: { skip: true } }}
            ]
        }
      ]
    }]
},
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
