import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentSnapshot, QuerySnapshot} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import Page, {DataModel} from '../../models/page.model';
import {take} from 'rxjs/operators';

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

  public setPages(data: Page[]): Promise<void> {
    return new Promise<void>((resolve) => {
      this.fs.collection('pages').get().pipe(take(1)).subscribe((qsnap) => {
        let promises = [];
        qsnap.forEach((doc) => promises.push(doc.ref.delete()));
        Promise.all(promises).then(() => {
          promises = [];
          data.forEach((item) => {
            promises.push(this.fs.collection('pages').doc(item.slug).set(item));
            Promise.all(promises).then(() => {
              resolve();
            })
          })
        })
      })
    });
  }

  public getPages(): Observable<Page[]> {
    return new Observable(observer => {
      let res: Page[] = [];
      this.fs.collection('pages', ref => ref.orderBy('position')).get().subscribe((value: QuerySnapshot<Page>) => {
        res = [];
        value.docs.forEach(doc => {
          res.push(doc.data());
        });
        observer.next(res);
      });
    });
  }

  public checkPagesModel(doc: Page[]): { success: boolean, reason: string | undefined } {
    console.log(doc);
    if (!Array.isArray(doc)) {
      return {success: false, reason: 'Main object should be an array.'};
    }
    for (let i = 0; i < doc.length; i++) {
      const ret = this.checkPageModel(doc[i], i);
      if (!ret.success) {
        return ret;
      }
    }
    return {success: true, reason: undefined};
  }

  private checkPageModel(page: Page, index: number): { success: boolean, reason: string | undefined } {
    if (page.name.length === 0) {
      return {success: false, reason: `The name of the page number ${index + 1} cannot be empty.`};
    }
    if (page.slug.length === 0) {
      return {success: false, reason: `The slug of the ${page.name} page cannot be empty.`};
    }
    if (!Array.isArray(page.model)) {
      return {success: false, reason: `The ${page.name} page model should be an array.`};
    }
    if (page.model.length === 0) {
      return {success: false, reason: `The ${page.name} page cannot be empty.`};
    }
    for (let i = 0; i < page.model.length; i++) {
      const ret = this.checkFieldModel(page.model[i], i, page.name);
      if (!ret.success) {
        return ret;
      }
    }
    return {success: true, reason: undefined};
  }

  private checkFieldModel(field: DataModel, fieldIndex: number, pageName: string): { success: boolean, reason: string | undefined } {
    if (field.name.length === 0) {
      return {success: false, reason: `The name of the field number ${fieldIndex + 1} of the ${pageName} page cannot be empty.`};
    }
    if (!field.keysAreProperties && field.path.length === 0) {
      return {success: false, reason: `The path of the ${field.name} field of the ${pageName} page cannot be empty`};
    }
    return {success: true, reason: undefined};
  }

}
