import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../../environments/environment';

import {AuthService as SAuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

  private AUTH_API_URL = `${environment.API_URL}`;
  userSubject: Subject<User> = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    // private sas: SAuthService,
    private router: Router
  ) {
    // this.sas.authState
    //   .subscribe((user: SocialUser) => {
    //     console.log(user);
    //     if (user) {
    //       let url;
    //       switch (user.provider) {
    //         case 'FACEBOOK':
    //           url = `${this.AUTH_API_URL}/fblogin`;
    //           break;
    //         case 'GOOGLE':
    //           url = `${this.AUTH_API_URL}/googlelogin`;
    //           break;
    //         default:
    //           break;
    //       }
    //       this.http.post<{ success: boolean, user: User, token: string }>(url, {access_token: user.authToken})
    //         .subscribe((res: { success: boolean, user: User, token: string }) => {
    //           if (res && res.success) {
    //             this.userSubject.next(res.user as User);
    //             localStorage.setItem('access_token', res.token);
    //             this.router.navigate(['/products']);
    //           }
    //         });
    //     }
    //   });
  }

  login(user: any): Observable<{ success: boolean, user: any }> {
    // form url encoded data.
    const httpParams = new HttpParams()
      .append('username', user.username)
      .append('password', user.password);
    return this.http.post<{ success: boolean, user: any }>(`${this.AUTH_API_URL}/login`, httpParams, {withCredentials: true});
  }

    register(user: User): Observable<{ success: boolean }> {
      return this.http.post<{ success: boolean }>(`${this.AUTH_API_URL}/users`, user);
  }

  // fbLogin() {
  //   this.sas.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }
  //
  // googleLogin() {
  //   this.sas.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }
  //
  // logout() {
  //   this.sas.signOut();
  //   localStorage.removeItem('access_token');
  // }

}
