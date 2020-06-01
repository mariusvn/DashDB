import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentSnapshot, QuerySnapshot} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import Page from '../../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  constructor(private fs: AngularFirestore) {}

  public getPage(id: string): Observable<Page> {
    return new Observable(observer => {
      this.fs.collection('pages').doc(id).get().subscribe((value: DocumentSnapshot<Page>) => {
        observer.next(value.data());
      });
    });
  }

  public getPages(): Observable<Page[]> {
    return new Observable(observer => {
      let res: Page[] = [];
      this.fs.collection('pages').get().subscribe((value: QuerySnapshot<Page>) => {
        res = [];
        value.docs.forEach(doc => {
          res.push(doc.data());
        });
        observer.next(res);
      });
    });
  }
}
