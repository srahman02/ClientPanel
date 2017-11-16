import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database-deprecated';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import *as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  user: Observable<firebase.User>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private database: AngularFireDatabase
  ) {
    this.user = firebaseAuth.authState;
  }

  signup(email:string, password:string){
    return new Promise((resolve, reject)=>{
      this.firebaseAuth.auth.createUserWithEmailAndPassword(email,password)
      .then(userData=>resolve(userData), 
      err=>reject(err));
       });
    }

  login(email:string, password:string){
    return new Promise((resolve, reject)=>{
      this.firebaseAuth.auth.signInWithEmailAndPassword(email,password)
      .then(userData=>resolve(userData), 
      err=>reject(err));
       });
    }

    logout(){
      return this.firebaseAuth.auth.signOut();
    }
    isAuthenticated(){
      return this.user != null;
    }

}
