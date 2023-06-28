import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Amplify, Auth } from 'aws-amplify';
import { environment } from 'src/environments/environment';

export interface IUser {
  email: string;
  password: string;
  token: string;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authenticationSubject: BehaviorSubject<any>;

  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });
    this.authenticationSubject = new BehaviorSubject<boolean>(false);
    this.getUser().then((val) => {
      // console.log(val);
      if (val)
        this.authenticationSubject = new BehaviorSubject<boolean>(true);
    });
    
  }

  public signIn(username: string, password: string): Promise<any> {
    return Auth.signIn(username, password)
      .then(user => {
        this.authenticationSubject.next({ success: true, user });
        return user;
      })
      .catch(error => {
        this.authenticationSubject.next({ success: false, error });
        throw error;
      });
  }
  

  public signOut(): Promise<any> {
    return Auth.signOut()
    .then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
      .then((user: any) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }).catch(() => {
        return false;
      });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
    .then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }

  public getToken(): Promise<string> {
    let jwt: string = '';
    return Auth.currentSession().then(res=>{
      let accessToken = res.getIdToken()
      jwt = accessToken.getJwtToken()
          
      //You can print them to see the full objects
      // console.log(`myAccessToken: ${JSON.stringify(accessToken)}`)
      // console.log(`myJwt: ${jwt}`)
      return jwt;
    })
  }

  public changePassword(oldPassword:string, newPassword: string, user:any): any {
    Auth.currentAuthenticatedUser()
      .then(res => {
        return Auth.changePassword(user, oldPassword, newPassword);
      })
      .then(() => {
        console.log('Password changed successfully.');
        return true;
        // Perform any additional actions after password change
      })
      .catch(error => {
        console.error('Error changing password:', error);
        return false;
        // Handle error scenario
      });
  }
  // public changePassword(username: string, oldPassword: string, newPassword: string): Promise<any> {
  //   return Auth.signIn(username, oldPassword)
  //     .then(() => {
  //       return Auth.forgotPassword(username);
  //     })
  //     .then(() => {
  //       return Auth.forgotPasswordSubmit(username, verificationCode, newPassword);
  //     });
  // }
  
}
