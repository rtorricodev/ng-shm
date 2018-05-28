
//angular modules
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//Observables
import { Observable } from 'rxjs/Observable';

//Model
import { Reminder} from './../models/reminder';

//firebase
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebaseConfig from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable()
export class ReminderService {
    itemsRef: AngularFireList<any>;

    constructor(private db: AngularFireDatabase, private router: Router,private  autenticationFire: AngularFireAuth){
        this.itemsRef = this.db.list('reminders');
    }

    getReminders(): Observable<any[]> {
        // let reminders =[];
        // const ref = firebaseConfig.database().ref('reminders');
        // ref.orderByChild("uid").equalTo(this.autenticationFire.auth.currentUser.uid).on("child_added", function(snapshot) {
        //     reminders.push({key: snapshot.key, ... snapshot.val()})
        // });
        // return Observable.of(reminders);
        return  this.itemsRef.snapshotChanges().map(value => {
            return value.map (
                val => ({ 
                    key: val.payload.key, 
                    ... val.payload.val() 
                }));
        });
    }


    createReminder(reminder: Reminder){
        this.autenticationFire.authState.subscribe(user =>{
            reminder.uid = user.uid;
            this.itemsRef.push(reminder)}
        );
        this.router.navigate(['/reminders']);
    }

    getReminder(key:string){
        return firebaseConfig.database().ref().child('reminders/' + key).once('value')
            .then((snap) => {
                return {key: snap.key, ... snap.val()}
            });
    }

    deleteReminder(key: string) {
        this.itemsRef.remove(key);
    }

    updateReminder(key: string, reminder: Reminder) {
        this.itemsRef.update(key,reminder);
        this.router.navigate(['/reminders']);
    }

}