import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentSnapshot} from '@angular/fire/firestore';
import SocietyData from '../../models/society-data.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocietyService {

  constructor(private fs: AngularFirestore) {}

  public getSocietyData(): Observable<SocietyData> {
    return new Observable(observer => {
      this.fs.collection('society-data').doc('data').get().subscribe((value: DocumentSnapshot<SocietyData>) => {
        observer.next(value.data());
      });
    });
  }

}
