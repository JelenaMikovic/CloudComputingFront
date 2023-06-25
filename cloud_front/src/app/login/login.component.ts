import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loading: boolean;
  
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  constructor(private router: Router, private authService: AuthService) {
    this.loading = false;
  }

  async signIn() {
    try {
      const { username, password} = this.loginForm.value;
      if (!username) {
        throw new Error('Username is required.');
      }
      if (!password) {
        throw new Error('Password is required.');
      }
      await this.authService.signIn(username, password);
      console.log('User signed in successfully.');
      // alert('User signed in successfully.');
      this.router.navigate(['/all']);
    } catch (error: any) {
      console.log('Error signing in:', error);
      alert('Error signing in: ' + error.message);
    }
  }

  signInUser() {
    this.signIn();
  }
}
