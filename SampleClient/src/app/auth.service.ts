import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user';

@Injectable()
export class AuthService {

  constructor(public userService: UserService) { }

  login(email: string, password: string): boolean {

    var userObj = new User();

    userObj.email = email;
    userObj.password = password;

    this.userService.login(userObj).subscribe(tokenObject => {
      if (tokenObject.token) {
        localStorage.setItem('username', email);
        localStorage.setItem('usertoken', "bearer " + tokenObject.token);
        localStorage.setItem('userrole', tokenObject.role);
        return true;
      }
      else {
        return false;
      }
    },
      err => {
        console.log(err);
        return false;
      })
    return false;
  }

  logout(): any {
    localStorage.removeItem('username');
  }

  getUser(): any {
    return localStorage.getItem('username');
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  isAdmin(): boolean {
    return (localStorage.getItem('userrole') === 'admin');
  }
}
export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];
