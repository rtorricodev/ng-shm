import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import {Router} from "@angular/router";
import { UserInfo } from './models/user.info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private alertType = null;
  private alertMessage = "";
  isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLoggedIn().subscribe(this.isLoggedIn);
}

onRegisterSuccess() {
  this.alertType = "success";
  this.alertMessage = "User registered!";
}

onError(err) {
  this.alertType = "danger";
  this.alertMessage = err;
}


}
