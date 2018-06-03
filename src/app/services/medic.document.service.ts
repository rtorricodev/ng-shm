
//angular modules
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//Observables
import { Observable } from 'rxjs/Observable';

//Model
import { MedicDocument} from './../models/medic-document';

//firebase
import { AngularFireDatabaseModule, AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebaseConfig from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { forEach } from '@angular/router/src/utils/collection';


@Injectable()
export class medicDocumentService {
    itemsRef: AngularFireList<any>;

    constructor(private db: AngularFireDatabase, private router: Router,private  autenticationFire: AngularFireAuth){
        this.itemsRef = this.db.list('medicDocuments');
    }

    pushUpload(medicDocument: MedicDocument){
        const storageRef = firebaseConfig.storage().ref();
        const uploadTask = storageRef.child('/medicDocuments' + '/' + medicDocument.file.name).put(medicDocument.file);
        uploadTask.on(firebaseConfig.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                medicDocument.progress = Math.round((uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100);
            },
            (error) => {
                console.log(error);
            },
            () => {
                medicDocument.url = uploadTask.snapshot.downloadURL;
                medicDocument.photoName = medicDocument.file.name;
            }
        )
    }

    deleteUpload(medicDocument: MedicDocument) {
        this.deleteFileData(medicDocument.$key)
        .then( () =>{
            this.deleteFileStorage(medicDocument.photoName)
        })
        .catch(error => console.log(error))
    }

    private deleteFileData(key: string) {
        return this.db.list('/medicDocuments').remove(key);
    }

    private deleteFileStorage(name: string) {
        let storageRef = firebaseConfig.storage().ref();
        storageRef.child('/medicDocuments' + '/' + MedicDocument.name).delete();
    }
     
    getMedicDocuments(): Observable<any[]> {
        let medicDocuments =[];
        const ref = firebaseConfig.database().ref('medicDocuments');
        ref.orderByChild("uid").equalTo(this.autenticationFire.auth.currentUser.uid).on("child_added", function(snapshot) {
            medicDocuments.push({key: snapshot.key, ... snapshot.val()})
        });
        return Observable.of(medicDocuments);
    }

    getMedicDocumentsFilterBy(requiredCategory: string): Observable<any[]> {
        let medicDocuments =[];
        let uid = this.autenticationFire.authState.subscribe(user =>{ 
            const ref = firebaseConfig.database().ref('medicDocuments'); 
                ref.orderByChild("category").equalTo(requiredCategory).on ("child_added",function(snapshot) {
                    if(user.uid === snapshot.val().uid){
                        medicDocuments.push({key: snapshot.key, ... snapshot.val()})
                    }
            });
        });
        return Observable.of(medicDocuments);
    }

    getMedicDocumentFilterByName(name: string): Observable<any[]> {
        let medicDocuments =[];
        const ref = firebaseConfig.database().ref('medicDocuments');
        let uid = this.autenticationFire.authState.subscribe(user => {
            ref.orderByChild("uid").equalTo(user.uid).on("child_added", function(snapshot) {
                let answer;
                const myTitle =  snapshot.child('title').val();
                const myTitleString = String(myTitle);
                answer = myTitleString.search(String(name));
                console.log(name);
                console.log(myTitle);
                console.log(answer);
                if(answer >= 0) {
                    medicDocuments.push({key: snapshot.key, ... snapshot.val()})
                }
            });
        })
        return Observable.of(medicDocuments);
    }

    

    getMedicDocumentOrderedByDate(){
        let medicDocuments =[];
        const ref = firebaseConfig.database().ref('medicDocuments');
        let uid = this.autenticationFire.authState.subscribe(user => {
            ref.orderByChild("uid").equalTo(user.uid).on("child_added", function(snapshot) {
                 medicDocuments.push({key: snapshot.key, ... snapshot.val()});
                 medicDocuments.sort(function(a,b){
                    a = new Date (a['date']); 
                    b = new Date (b['date']);


                    return  a - b ;
                 });
            });
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