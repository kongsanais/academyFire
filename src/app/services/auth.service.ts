import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private navCtrl: NavController) { }

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
