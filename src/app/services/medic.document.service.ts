
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
import { AngularFireAuth } from 'angularfire2/auth';
import { EAFNOSUPPORT } from 'constants';

@Injectable()
export class medicDocumentService {
    itemsRef: AngularFireList<any>;

    constructor(private db: AngularFireDatabase, private router: Router,private  autenticationFire: AngularFireAuth){
        this.itemsRef = this.db.list('medicDocuments');
    }
    
    getMedicDocuments(): Observable<any[]> {
        let medicDocuments =[];
        const ref = firebaseConfig.database().ref('medicDocuments');
        ref.orderByChild("uid").equalTo(this.autenticationFire.auth.currentUser.uid).on("child_added", function(snapshot) {
            medicDocuments.push({key: snapshot.key, ... snapshot.val()})
        });
        return Observable.of(medicDocuments);
    }

    createMedicDocument(medicDocument: MedicDocument){
        this.autenticationFire.authState.subscribe(user =>{
            medicDocument.uid = user.uid;
            this.itemsRef.push(medicDocument)}
        );
        this.router.navigate(['/home']);
    }

    getMedicDocument(key:string){
         return firebaseConfig.database().ref().child('medicDocuments/' + key).once('value')
             .then((snap) => {
                 return {key: snap.key, ... snap.val()}
             });
    }

    deleteMedicDocument(key: string) {
        this.itemsRef.remove(key);
    }

    updateMedicDocument(key: string, medicDocument: MedicDocument) {
        this.itemsRef.update(key,medicDocument);
        this.router.navigate(['/home']);
    }
}