import { Component, OnInit,  EventEmitter, Output } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { UserInfo } from './../../models/user.info';
import {Observable} from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.scss']
})
export class DisplayUserComponent implements OnInit {
  


  @Output() onLoggedOut = new EventEmitter();
  userInfo: Observable<UserInfo>;
  
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.userInfo = this.authService.currentUser();
  }

  currentUser() {
    this.userInfo = this.authService.currentUser();
  }

  navigateToReminders(event) {
    this.router.navigate(['/reminders']);
  }

  logout() {
    this.authService.logout().subscribe(() => this.onLoggedOut.emit("success"));
  }
}
