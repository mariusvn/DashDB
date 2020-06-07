import {Component, OnDestroy} from '@angular/core';
import {SocietyService} from '../../services/society.service';
import Page from '../../../models/page.model';
import {PageService} from '../../services/page.service';
import {DatabaseService} from '../../services/database.service';
import {AuthService} from '../../services/auth.service';
import {ReplaySubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'dash-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy {
  public companyName: string = '';
  public pages: {title: string, link?: string}[] = [];
  public userName: string = '';
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private societyService: SocietyService,
              private pageService: PageService,
              private databaseService: DatabaseService,
              private authService: AuthService) {
    this.societyService.getSocietyData().pipe(takeUntil(this.destroyed$)).subscribe(data => {
      this.companyName = data.name;
    });
    this.pageService.getPages().pipe(takeUntil(this.destroyed$)).subscribe(data => {
      data.forEach(page => {
        this.pages.push({title: page.name, link: '/board/' + page.slug});
      })
    });
    this.authService.user.pipe(takeUntil(this.destroyed$)).subscribe(user => (user) ? this.userName = user.email : this.userName = undefined);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  disconnect(): void {
    this.authService.logout();
  }
}
