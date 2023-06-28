import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AwsServiceService } from '../service/aws-service.service';

@Component({
  selector: 'app-invire-register',
  templateUrl: './invire-register.component.html',
  styleUrls: ['./invire-register.component.css'],
})
export class InvireRegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    repeatPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    birthDate: new FormControl('', [Validators.required]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    invitingUser: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  constructor(private router: Router, private service: AwsServiceService) {}

  async signUp() {
    try {
      console.log('kara mia');
      const {
        email,
        firstName,
        lastName,
        password,
        repeatPassword,
        birthDate,
        username,
        invitingUser,
      } = this.registerForm.value;
      if (!username) {
        throw new Error('Username is required.');
      }

      if (!password) {
        throw new Error('Password is required.');
      }
      if (password === repeatPassword && this.registerForm.valid) {
        const requestBody = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          username: username,
          birthDate: birthDate,
          password: password,
          invitingUser: invitingUser,
        };
        const res = await this.service.registerByInvite(requestBody);
        res.subscribe({
          next: (response) => {
            console.log(response);
            // this.snackBar.open('Request successfully sent!', '', {
            //   duration: 2000,
            // });
          },
          error: (error) => {
            // this.snackBar.open('Error sharing folder', '', {
            //   duration: 2000,
            // });
            console.log('Error sharing folder:', error);
          },
        });

        alert('User registered successfully.');
      }
    } catch (error: any) {
      console.log('Error registering user:', error);
      alert('Error registering user: ' + error.message);
    }
  }

  registerUser() {
    console.log(
      this.registerForm.value.password,
      '   ',
      this.registerForm.value.repeatPassword
    );
    if (
      this.registerForm.value.password !==
      this.registerForm.value.repeatPassword
    ) {
      alert('Passwords do not match.');
      return;
    }
    this.signUp();
  }
}
