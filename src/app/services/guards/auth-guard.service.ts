import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {AuthService} from '../auth.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {Observable, Subscriber} from 'rxjs';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(routeSnapshot: ActivatedRouteSnapshot): Observable<boolean> {
    return new Observable((observer: Subscriber<boolean>) => {
      this.auth.user.pipe(take(1)).subscribe(u => {
        if (u) {
          if (routeSnapshot.routeConfig.path.includes('auth')) {
            this.router.navigate(['board', 'home']);
            return observer.next(false);
          } else {
            return observer.next(true);
          }
        } else {
          if (routeSnapshot.routeConfig.path.includes('auth')) {
            return observer.next(true);
          } else {
            this.router.navigate(['auth', 'login']);
            return observer.next(false);
          }
        }
      })
    }).pipe(take(1));
  }
}
