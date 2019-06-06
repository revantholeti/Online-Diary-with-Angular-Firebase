import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from 'src/app/service/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as admin from "firebase-admin";
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Details } from 'src/app/shared/details.module';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-home', 
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user = null;
  public details:Details;
  public show:boolean=true;
  lists:Observable<Details[]>
  uid:BehaviorSubject<string>
  constructor(private afauth:AngularFireAuth,private login:LoginService,private route:Router,
    private activatedroute:ActivatedRoute,private afs:AngularFirestore) { }

  ngOnInit() {
    this.login.getusers().subscribe(auth=>{
      this.user=auth
    })
    this.uid = new BehaviorSubject(localStorage.getItem('token'))
    this.lists = this.uid.pipe(
      switchMap(uid => this.afs.collection<Details>('dailydiary',ref=>ref.where('uid','==',uid)).valueChanges(),),
    );
  }

  getdetails(details){
    this.details = details;
    this.show = false;
  }

}