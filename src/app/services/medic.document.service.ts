//angular modules
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//Observables
import { Observable } from 'rxjs/Observable';

//Model
import { MedicDocument } from './../models/medic-document';

//firebase
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebaseConfig from 'firebase';

@Injectable()
export class medicDocumentService {
    itemsRef: AngularFireList<any>;

    constructor(private db: AngularFireDatabase, private router: Router){
        this.itemsRef = this.db.list('medicDocuments');
    }
    
    getMedicDocuments(): Observable<any[]> {
        return this.itemsRef.snapshotChanges().map(value => { 
            return value.map(val => ({key: val.payload.key, ... val.payload.val()})
            );
        });
    }
}