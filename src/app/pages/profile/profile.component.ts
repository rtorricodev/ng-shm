import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import {Observable} from "rxjs";
import { Router } from '@angular/router';

import { UserInfo } from './../../models/user.info';
import { UserMedicInfo } from './../../models/user.medic.info';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userInfo: Observable<UserInfo>;
  UserMedicInfoList: Observable<UserMedicInfo[]>;
  UserMedicInfo: UserMedicInfo;

  constructor(private authService: AuthService, private router: Router) { 
    this.UserMedicInfoList = this.authService.getBasicInfo();
    this.UserMedicInfo = this.authService.getBasicInfoOne();
  }

  ngOnInit() {
    this.userInfo = this.authService.currentUser();
  }

  currentUser() {
    this.userInfo = this.authService.currentUser();
  }

  update(key: string,age: number,weight: number, height: number, blod: string){
    console.log(blod);
    this.authService.updateBasicInfo(key, age, weight, height, blod);
  }
}
