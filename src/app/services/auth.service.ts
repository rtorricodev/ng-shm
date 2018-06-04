// angular
import {Injectable, Inject} from '@angular/core';
import { Router } from '@angular/router';

// models
import { UserInfo } from './../models/user.info';
import { UserMedicInfo } from './../models/user.medic.info';

// firebase
import * as firebase from 'firebase/app';
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

// rxjs
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import * as firebaseConfig from 'firebase';

@Injectable()
export class AuthService {

    static UNKNOWN_USER = {
        isAnonymous: true,
        email: null,
        displayName: null,
        providerId: null,
        uid: null
    };

    itemsRef: AngularFireList<any>;
 

    userInfo = new BehaviorSubject<UserInfo>(AuthService.UNKNOWN_USER);
    private user: firebase.User;

    constructor(private angularFireAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
        this.itemsRef = this.db.list('UserMedicInfo');
        this.angularFireAuth.authState.subscribe(user => {
            // console.log("user: ", JSON.stringify(user));
            this.user = user;
            const userInfo = new UserInfo();
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
        const result = new Subject<string>();
        this.angularFireAuth.authState.subscribe(user => {
            // console.log("Update: ", user);
            if (user != null) {
                user.updateProfile({displayName: displayName, photoURL: null});
            }
        });
        this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                // auth.auth.updateProfile({displayName: displayName, photoURL: null});
                result.next('success');
            })
            .catch(err => result.error(err));
        return result.asObservable();
    }

    isLoggedIn(): Observable<boolean> {
        return this.userInfo.map(userInfo => !userInfo.isAnonymous);
    }

    login(email: string, password: string): Observable<string> {
        const  result = new Subject<string>();
        this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                result.next('success');
            })
            .catch(err => result.error(err));
        return result.asObservable();
    }

    currentUser(): Observable<UserInfo> {
        return this.userInfo.asObservable();
    }

    logout(): Observable<string> {
        const result = new Subject<string>();
        this.userInfo.next(AuthService.UNKNOWN_USER);
        this.angularFireAuth.auth.signOut()
            .then(() => result.next('success'))
            .catch(err => result.error(err));
        return result.asObservable();
    }

    loginViaProvider(provider: string): Observable<String> {
        const result = new Subject<string>();
        if (provider === 'google') {
            this.angularFireAuth .auth
                .signInWithPopup(new firebase.auth.GoogleAuthProvider())
                    .then(auth => {
                        console.log(result.next);
                        result.next('success');
                    })
                    .catch(err => {
                        console.log(result.error);
                        result.error(err);
                    }
                );
            return result.asObservable();
        }
        result.error('Not a supported authentication method: ' + provider);
        return result.asObservable();
    }

    createBasicInfo(UserMedicInfo: UserMedicInfo) {
        let medicDocuments = [];
        const ref = firebaseConfig.database().ref('UserMedicInfo');

        this.angularFireAuth.authState.subscribe(user =>{
            ref.orderByChild("uid").equalTo(this.angularFireAuth.auth.currentUser.uid).on("child_added", function(snapshot) {
                medicDocuments.push({key: snapshot.key, ... snapshot.val()});
                if(medicDocuments.length === 0) {
                    UserMedicInfo.uid = user.uid;
                    this.itemsRef.push(UserMedicInfo);
                } 
            });
      
        });
    }

    getBasicInfo(): Observable<any[]> {
        let basicInfo = [];
        const ref = firebaseConfig.database().ref('UserMedicInfo');
        this.angularFireAuth.authState.subscribe(user =>{
            ref.orderByChild("uid").equalTo(user.uid).on("child_added", function(snapshot) {
                basicInfo.push({key: snapshot.key, ... snapshot.val()})
            });
        });
        return Observable.of(basicInfo);
    }

    updateBasicInfo(key: string, age: number, weight: number, heigth: number, blod: string) {
        let info = new UserMedicInfo();
        this.angularFireAuth.authState.subscribe(user =>{
            let myId = user.uid;
            info.setUserMedicInfo(age,weight,heigth,blod,myId);
            this.itemsRef.update(key,info);
        });
    
    }

    getBasicInfoOne(): UserMedicInfo{
        let basicInfo = [];
        const ref = firebaseConfig.database().ref('UserMedicInfo');
        this.angularFireAuth.authState.subscribe(user =>{
            ref.orderByChild("uid").equalTo(user.uid).on("child_added", function(snapshot) {
                basicInfo.push({key: snapshot.key, ... snapshot.val()})
            });
        });
        return basicInfo[0];
    }








}
