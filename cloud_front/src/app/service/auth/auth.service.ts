import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });
  public get headers() {
    return this._headers;
  }
  public set headers(value) {
    this._headers = value;
  }

  user$ = new BehaviorSubject(null); //TODO
  userState$ = this.user$.asObservable();

  constructor(private http: HttpClient) {
    this.user$.next(null);
  }

  // login(auth: JwtAuthenticationRequest): Observable<TokenResponse> {
  //   return this.http.post<TokenResponse>(environment.apiHost + '/api/user/login', auth, {
  //     headers: this.headers,
  //   });
  // }

  getId(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      const id = helper.decodeToken(accessToken).id;
      return id;
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('user') != null) {
      return true;
    }
    return false;
  }

  setUser(): void {
    this.user$.next(null); //TODO
  }
  
}
