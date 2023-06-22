import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  registerForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(10)]),
    repeatPassword: new FormControl('', [Validators.required, Validators.minLength(10)]),
    birthDate: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  verificationCodeForm = new FormGroup({
    verificationCode: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  showCode = false;

  constructor(private router: Router) { }

  async signUp() {
    try {
      console.log("kara mia")
      const { email, firstName, lastName, password, repeatPassword, birthDate, username } = this.registerForm.value;
      if (!username) {
        throw new Error('Username is required.');
      }

      if (!password) {
        throw new Error('Password is required.');
      }
      const user = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          given_name: firstName,
          family_name: lastName,
          birthdate: birthDate
        }
      });
      console.log('User registered successfully.', user);
      alert('User registered successfully.');
      this.showCode = true;
    } catch (error: any) {
      console.log('Error registering user:', error);
      alert('Error registering user: ' + error.message);
    }
  }

  registerUser() {
    console.log(this.registerForm.value.password, "   ", this.registerForm.value.repeatPassword)
    if (this.registerForm.value.password !== this.registerForm.value.repeatPassword) {
      alert('Passwords do not match.');
      return;
    }
    this.signUp();
  }

  async confirmRegistration() {
    try {
      const username = this.registerForm.value.username;
      const verificationCode = this.verificationCodeForm.value.verificationCode;
      if (!username) {
        throw new Error('Username is required.');
      }

      if (!verificationCode) {
        throw new Error('Verification code is required.');
      }
      await Auth.confirmSignUp(username, verificationCode);
      console.log('User successfully verified');
      alert('User successfully verified');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('Error confirming sign up', error);
      alert('Error confirming sign up, try again');
    }
  }

  confirm() {
    this.confirmRegistration()
  }
}