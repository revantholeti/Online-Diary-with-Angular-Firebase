import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Router, ActivatedRoute } from '@angular/router';
import { resolve } from 'path';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private afauth:AngularFireAuth,private router:Router,private activatedroute:ActivatedRoute) { }

  googlelogin(){
    return new Promise((resolve)=>{
      var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
        resolve()
        })
    })
  }

  logout(){
    this.afauth.auth.signOut().then(
      res=>{
        localStorage.removeItem('token');
        this.router.navigate(['../login'],{relativeTo:this.activatedroute})
      }).catch(error => console.log(error.message)); 
  }

  getusers(){
    return this.afauth.user;
  }

  createuser(user:{email:any;password:any}){
    return new Promise((resolve,reject)=>{
      this.afauth.auth.createUserWithEmailAndPassword(user.email,user.password).then(
        (user)=>{
          this.afauth.user.subscribe( x => {
            if(x){
              x.sendEmailVerification()
              .then(()=>{
                console.log("Email verification sent");
              })
              .catch(err => {
                console.log("Error: ", err);
              })
            }
          resolve(user)
        },
        (error)=>{
          reject(error)
        });
    })
  })
}
    

  signinwithemail(user:{email:any;password:any}){
    return new Promise((resolve,reject)=>{
      this.afauth.auth.signInWithEmailAndPassword(user.email,user.password).then(
        ()=>{
          resolve()
        },
        (error)=>{
          reject(error)
        })
    })
  }

  gettoken(){
    return !!localStorage.getItem('token');
  }
}
