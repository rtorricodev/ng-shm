import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent{
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService, private router: Router) { }

  navigateToResetPassword($event) {
    this.router.navigate(['reset-password']);
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

}
