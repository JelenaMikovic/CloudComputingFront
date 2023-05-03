import { Component } from '@angular/core';
import { Router } from '@angular/router';


import {Auth} from "aws-amplify";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading: boolean;
  userName:String;
  password:String;

  constructor(private router: Router,) {
    this.loading = false;
    this.userName = "";
    this.password = ""
  }

  async signIn() {
    try {
      let email = "karolina1";
      let password = "Karolina1!";
      await Auth.signIn(email, password);
      console.log('User signed in successfully.');
      alert('User signed in successfully.');
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.log('Error signing in:', error);
      alert('Error signing in: ' + error.message);
    }
  }

  signInUser() {
    this.signIn();
  }
}
