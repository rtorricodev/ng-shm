import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import { AuthService } from './../../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  constructor(private authService: AuthService, private router: Router) { }

  isLoggedIn(): Observable<boolean> {
    return this.authService.isLoggedIn();
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }



}
