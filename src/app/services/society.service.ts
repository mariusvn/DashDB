import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentSnapshot} from '@angular/fire/firestore';
import SocietyData from '../../models/society-data.model';
import {Observable} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SocietyService {
  private secondaryFirebase: firebase.app.App = undefined;

  constructor(private fs: AngularFirestore) {}

  public getSocietyData(): Observable<SocietyData> {
    return new Observable(observer => {
      this.fs.collection('society-data').doc('data').get().subscribe((value: DocumentSnapshot<SocietyData>) => {
        observer.next(value.data());
      });
    });
  }



}
