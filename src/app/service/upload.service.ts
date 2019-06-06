import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database'
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private db: AngularFireDatabase,private afs:AngularFirestore) { }

  dailydiary: AngularFireList<any>;

  insertImageDetails(dailydiary){
    this.afs.collection('dailydiary').add(dailydiary)
  }
}