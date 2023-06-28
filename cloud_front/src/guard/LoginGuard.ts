import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.authService.getUser().then((res) => {
        console.log(res);
        
      if(res){
        this.router.navigate(['/all']);
        return false;
      }
      return true;
    });
    return true;
  }
}
