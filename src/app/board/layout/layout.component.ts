import {Component, OnDestroy} from '@angular/core';
import {SocietyService} from '../../services/society.service';
import Page from '../../../models/page.model';
import {PageService} from '../../services/page.service';
import {DatabaseService} from '../../services/database.service';
import {AuthService} from '../../services/auth.service';
import {ReplaySubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {NbWindowService} from '@nebular/theme';
import {AdminDialogComponent} from '../dialogs/admin-dialog/admin-dialog.component';

@Component({
  selector: 'dash-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy {
  public companyName: string = '';
  public pages: {title: string, link?: string}[] = [];
  public userName: string = '';
  public isAdmin: boolean = false;
  private admins = [];
  private uid = '';
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private societyService: SocietyService,
              private pageService: PageService,
              private databaseService: DatabaseService,
              private authService: AuthService,
              private windowService: NbWindowService) {
    this.societyService.getSocietyData().pipe(takeUntil(this.destroyed$)).subscribe(data => {
      this.companyName = data.name;
      this.admins = data.admins;
      this.updateAdminStatus();
    });
    this.pageService.getPages().pipe(takeUntil(this.destroyed$)).subscribe(data => {
      data.forEach(page => {
        this.pages.push({title: page.name, link: '/board/' + page.slug});
      })
    });
    this.authService.user.pipe(takeUntil(this.destroyed$)).subscribe(user => {
      (user) ? this.userName = user.email : this.userName = undefined;
      (user) ? this.uid = user.uid : this.uid = '';
      this.updateAdminStatus();
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  disconnect(): void {
    this.authService.logout();
  }

  updateAdminStatus(): void {
    this.isAdmin = this.admins.includes(this.uid);
  }

  openAdminDialog(): void {
    this.windowService.open(AdminDialogComponent, {title: 'Admin panel'})
  }
}
