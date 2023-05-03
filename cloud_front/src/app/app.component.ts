import {Component, OnInit} from '@angular/core';
import { AuthService } from './service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'cloud_front';
  isAuthenticated: boolean;
  constructor(private router: Router) {
    this.isAuthenticated = false;
  }

  public ngOnInit(): void {
    // this.cognitoService.isAuthenticated()
    //   .then((success: boolean) => {
    //     this.isAuthenticated = success;
    //   });
  }

  public signOut(): void {
    // this.cognitoService.signOut()
    //   .then(() => {
    //     this.router.navigate(['/login']);
    //   });
  }
}
