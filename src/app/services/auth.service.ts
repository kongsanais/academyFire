import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private navCtrl: NavController) { }



  signIn(credentials): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(credentials.email, credentials.password)).pipe(
      switchMap(user => {
        console.log('real user: ', user);
        if (user) {
          return this.db.doc(`users/${user.user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  
  signUp(credentials) {
    return this.afAuth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(data => {
      console.log('after register: ', data);
      return this.db.doc(`users/${data.user.uid}`).set({
        name: credentials.name,
        email: credentials.email,
        role: credentials.role,
        created: firebase.default.firestore.FieldValue.serverTimestamp()
      });
    });
  }





}