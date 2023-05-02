import { Component } from '@angular/core';
import { AuthService } from './service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cloud_front';
  // constructor(private authService: AuthService) {}

  ngOnInit() : void {}

  // isUnregistered() {
    
  //   if (this.authService.isLoggedIn()) {
  //     return false;
  //   } else {
  //     return true
  //   }
  // }

  // isRegisteredUser() {
    
  //   if (this.authService.isLoggedIn()) {
  //       return true;
  //   }
  //   return false;
  // }
}
