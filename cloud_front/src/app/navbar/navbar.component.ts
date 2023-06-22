import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { RecursiveAstVisitor } from '@angular/compiler';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuth: boolean;
  constructor(private router: Router, private cognitoService: AuthService) {
    this.isAuth = true;
  }

  public ngOnInit(): void {
    this.cognitoService.authenticationSubject.subscribe(
      (val) => {
        console.log(val);
        this.isAuth = val;
      },
    );
  }

  isAuthenticated(): boolean {
    this.cognitoService.authenticationSubject.subscribe(
      (val) => {
        console.log(val);
        this.isAuth = val;
        return val;
      },
    );
    return this.isAuth;
  }

  public signOut(): void {
    this.isAuth = false;
    this.cognitoService.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
