import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  constructor(private authService: AuthService) { }

  isLoggedIn(): Observable<boolean> {
    return this.authService.isLoggedIn();
  }


}
