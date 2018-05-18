import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public userService: UserService, private router: Router, public authService: AuthService) { }

  ngOnInit() {
  }

  register(username: string, password: string) {
    var user = new User();
    user.name = username;
    user.password = password;

    this.userService.registerUser(user).subscribe((user) => {
      console.log(user);
      this.router.navigate(['/login']);
    });


  }

}
