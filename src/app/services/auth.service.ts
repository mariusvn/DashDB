import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {Observable} from 'rxjs';
import UserCredential = firebase.auth.UserCredential;
import {Router} from '@angular/router';
import * as admin from 'firebase-admin';
import {UserData} from '../../models/user.model';
import {AngularFireFunctions} from '@angular/fire/functions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private firebaseAuth: AngularFireAuth,
              private firebaseFunctions: AngularFireFunctions,
              private router: Router) {
    this.user = this.firebaseAuth.authState;
    this.user.subscribe((user: firebase.User) => {
      if (user) {
        this.localUser = user;
      } else {
        this.localUser = null;
      }
    });
  }

  user: Observable<firebase.User>;
  private localUser: firebase.User;

  isLoggedIn(): boolean {
    const usr = this.localUser;
    return !!usr;
  }

  signup(email: string, password: string): Promise<UserCredential> {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
  }

  login(email: string, password: string): Promise<UserCredential> {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password).then(user => {
        return user;
      })
  }

  logout(): Promise<void> {
    return this.firebaseAuth
      .signOut().then(() => {
        this.router.navigate(['auth', 'login']);
      })
  }

  async getAllUsers(): Promise<UserData[]> {
    const d = await (this.firebaseFunctions.httpsCallable('getAllUsers')({}).toPromise());
    return d.users;
  }

  async addUser(user): Promise<void> {
    const d = await (this.firebaseFunctions.httpsCallable('addUser')(user).toPromise())
    if (d.success) {
      return;
    } else {
      throw new TypeError(d.reason);
    }
  }

  async removeUser(uid: string): Promise<void> {
    const d = await (this.firebaseFunctions.httpsCallable('deleteUser')({uid}).toPromise())
    if (d.success) {
      return;
    } else {
      throw new TypeError(d.reason);
    }
  }

  async addAdmin(uid: string): Promise<void> {
    const d = await (this.firebaseFunctions.httpsCallable('addAdmin')({uid}).toPromise())
    if (d.success) {
      return;
    } else {
      throw new TypeError(d.reason);
    }
  }

  async removeAdmin(uid: string): Promise<void> {
    const d = await (this.firebaseFunctions.httpsCallable('removeAdmin')({uid}).toPromise())
    if (d.success) {
      return;
    } else {
      throw new TypeError(d.reason);
    }
  }
}
