import { Component } from '@angular/core';
import {Routes, RouterModule, Router} from "@angular/router";
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private router : Router, public authService: AuthService)
  {
    
  }

  logout(): boolean {
    this.authService.logout();
    return false;
  }
}
