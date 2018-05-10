import {Injectable, Inject} from "@angular/core";
import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { UserInfo } from './../models/user.info';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

    static UNKNOWN_USER = {
        isAnonymous: true,
        email: null,
        displayName: null,
        providerId: null,
        uid: null
    };

    userInfo = new BehaviorSubject<UserInfo>(AuthService.UNKNOWN_USER);
    private user: firebase.User;

    constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
        this.angularFireAuth.authState.subscribe(user => {
            // console.log("user: ", JSON.stringify(user));
            this.user = user;
            let userInfo = new UserInfo();
            if (user != null) {
                userInfo.isAnonymous = user.isAnonymous;
                userInfo.email = user.email;
                userInfo.displayName = user.displayName;
                userInfo.providerId = user.providerId;
                userInfo.photoURL = user.photoURL;
                userInfo.uid = user.uid;
            } else {
                this.user = null;
                userInfo.isAnonymous = true;
            }
            this.userInfo.next(userInfo);
        });
    }

    createUser(email: string, password: string, displayName: string): Observable<string> {
        let result = new Subject<string>();
        this.angularFireAuth.authState.subscribe(user => {
            // console.log("Update: ", user);
            if (user != null) {
                user.updateProfile({displayName: displayName, photoURL: null});
            }
        });
        this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                //auth.auth.updateProfile({displayName: displayName, photoURL: null});
                result.next("success");
            })
            .catch(err => result.error(err));
        return result.asObservable();
    }

    isLoggedIn(): Observable<boolean> {
        return this.userInfo.map(userInfo => !userInfo.isAnonymous);
    }

    login(email: string, password: string): Observable<string> {
        let result = new Subject<string>();
        this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                result.next("success");
            })
            .catch(err => result.error(err));
        return result.asObservable();
    }

    currentUser(): Observable<UserInfo> {
        return this.userInfo.asObservable();
    }

    logout(): Observable<string> {
        let result = new Subject<string>();
        this.userInfo.next(AuthService.UNKNOWN_USER);
        this.angularFireAuth.auth.signOut()
            .then(() => result.next("success"))
            .catch(err => result.error(err));
        return result.asObservable();
    }
}
