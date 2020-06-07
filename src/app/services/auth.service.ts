import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {Observable} from 'rxjs';
import UserCredential = firebase.auth.UserCredential;
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  private localUser: firebase.User;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = this.firebaseAuth.authState;
    this.user.subscribe((user: firebase.User) => {
      if (user) {
        this.localUser = user;
      } else {
        this.localUser = null;
      }
    });
  }

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
}
