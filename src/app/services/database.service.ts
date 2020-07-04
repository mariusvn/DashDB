import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/app';
import {SocietyService} from './society.service';

@Injectable({
  providedIn: 'root'
})
/**
 * This service is used to connect to the target secondary firebase application
 */
export class DatabaseService {
  private secondaryFirebase: firebase.app.App = undefined;
  private funcBuffer: ({func: () => void, inst: any})[] = [];
  private initialized: boolean = false;

  constructor(private societyService: SocietyService) {
    if (firebase.apps.length < 2)
      this.initSecondaryFirebaseConnection().then(() => console.info('Connected to secondary firebase'));
  }

  public initSecondaryFirebaseConnection(): Promise<firebase.app.App> {
    return new Promise<firebase.app.App>((resolve, reject) => {
      if (this.secondaryFirebase) {
        console.warn('Secondary firebase connection is already initialized');
        return reject('Secondary firebase connection is already initialized');
      }
      console.log('check b');
      const sub = this.societyService.getSocietyData().subscribe((value) => {
        this.secondaryFirebase = firebase.initializeApp(value.firebaseAccess, 'secondary');
        this.initialized = true;
        console.log('check a');
        this.funcBuffer.forEach(d => {
          d.func = d.func.bind(d.inst);
          d.func();
        });
        sub.unsubscribe();
        resolve(this.secondaryFirebase);
      })
    });
  }

  public getSecondaryFirebase(): firebase.app.App {
    if (!this.secondaryFirebase) {
      console.warn('Secondary firebase connection is not initialized');
    }
    return this.secondaryFirebase;
  }

  public onDatabaseConnected(callback: () => void, instance: any): void {
    console.log({initialized: this.initialized});
    if (this.initialized) {
      callback = callback.bind(instance);
      callback();
    } else {
      this.funcBuffer.push({func: callback, inst: instance});
    }
  }
}
