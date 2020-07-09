import {ChangeDetectorRef, Component, Inject, OnDestroy, PLATFORM_ID} from '@angular/core';
import Page, {DataModel} from '../../../models/page.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {take} from 'rxjs/operators';
import {PageService} from '../../services/page.service';
import {DatabaseService} from '../../services/database.service';
import * as firebase from 'firebase';
import 'firebase/database';
import {NbToastrService, NbWindowService} from '@nebular/theme';
import {EditDialogComponent} from '../dialogs/edit-dialog/edit-dialog.component';
import {isPlatformBrowser} from '@angular/common';
import {ConfirmDialogComponent} from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'dash-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnDestroy {

  public pageId: string = undefined;
  public page: Page = undefined;
  public rows: any[][] = [];
  public isBrowser: boolean;
  public namespace: any;
  private namespaceListener: any;
  private namespaceRef: firebase.database.Reference;
  private readonly cdrRefreshedInterval: number;
  private db: firebase.database.Database;

  constructor(private router: ActivatedRoute,
              private pageService: PageService,
              private databaseService: DatabaseService,
              private windowService: NbWindowService,
              private toastrService: NbToastrService,
              private cdr: ChangeDetectorRef,
              @Inject(PLATFORM_ID) platformId: any) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.cdr.detach();
    if (this.isBrowser)
    {
      // @ts-ignore
      this.cdrRefreshedInterval = setInterval(() => {
              this.cdr.detectChanges();
          }, 1000) as number;
    }
    router.paramMap.subscribe((params: ParamMap) => {
      this.rows = [];
      this.pageId = params.get('boardId');
      this.pageService.getPage(this.pageId).pipe(take(1)).subscribe(page => {
        this.page = page
        if (!this.isBrowser)
          return;
        this.databaseService.onDatabaseConnected(() => {
          this.db = databaseService.getSecondaryFirebase().database();
          this.namespaceRef = this.db.ref(this.page.namespace);
          this.namespaceListener = this.namespaceRef.on('value', (data) => {
            this.namespace = data.val();
            this.rows = [];
            this.getRowsData.bind(this)();
          });
        }, this);
      });
    });
  }

  private static getPath(path: string, id: string): string {
    return path.replace(/:([a-zA-Z]*?)(\/|$|\n)/gm, '' + id + '$2');
  }

  ngOnDestroy() {
    if (this.namespaceRef && this.namespaceListener) {
      this.namespaceRef.off('value', this.namespaceListener);
    }
    if (this.cdrRefreshedInterval)
      clearInterval(this.cdrRefreshedInterval);
  }

  public openEditDialog(index: number) {
    this.windowService.open(EditDialogComponent, {title: 'Edit ' + this.rows[this.page.main][index], context: {
        model: this.page.model,
        row: this.getRowContent(index),
        namespace: this.page.namespace,
        main: this.page.main,
        type: 'edit'
      }
    });
  }

  public openCreateDialog(): void {
    this.windowService.open(EditDialogComponent, {
      title: 'Create ' + this.page.name.toLowerCase(), context: {
        model: this.page.model,
        namespace: this.page.namespace,
        main: this.page.main,
        type: 'create'
      }
    });
  }

  private getRowContent(index: number) {
    const res = [];
    for (let i = 0; i < this.page.model.length; i++) {
      res.push(this.rows[i][index]);
    }
    return res;
  }

  /**
   * Fetch the rows data from database
   */
  private async getRowsData() {
    await this.getRowData(this.page.model[this.page.main], this.page.main);
    const promises = [];
    for (let index = 0; index < this.page.model.length; index++) {
      if (index === this.page.main)
        continue;
      promises.push(this.getRowData(this.page.model[index], index));
    }
    await Promise.all(promises);
    this.cdr.detectChanges();
  }

  private getRowData = (rowData: DataModel, index: number): Promise<void> => {
    return new Promise((resolve) => {
      if (this.page.main === index) {
        const path = rowData.path;
        const data = this.getPathContent(path);
        this.rows[index] = Object.keys(data);
      } else {
        this.rows[index] = [];
        for (let i = 0; i < this.rows[this.page.main].length; i++) {
          const path = TableViewComponent.getPath(rowData.path, this.getCurrentMain(i));
          this.rows[index][i] = this.getPathContent(path);
        }
      }
      resolve();
    });
  }

  /**
   * Delete the main
   */
  deleteItem(index: number): Promise<void> {
    return new Promise<void>(resolve => {
      const path = '/' + this.page.namespace + '/' +
        this.page.model[this.page.main].path +
        (this.page.model[this.page.main].path !== '' ? '/' : '') +
        this.rows[this.page.main][index];
      this.windowService.open(ConfirmDialogComponent,
        {
          title: 'Delete ' + this.rows[this.page.main][index],
          context: {
            text: 'Are you sure that you want to delete "' + this.rows[this.page.main][index] + '" ?',
            callback: () => {
              this.db.ref(path).remove(() => {
                resolve();
              });
            }
          }
        })
    })
  }

  private getCurrentMain(index: number) {
    return this.rows[this.page.main][index];
  }

  private getPathContent(path: string): any {
    path = path.trim();
    if (path[0] === '/')
      path = path.slice(1);
    const words: string[] = path.split('/')
    if (words.length === 0 || words.length === 1)
      return this.namespace;
    let data = this.namespace;
    try {
      for (const word of words) {
        data = data[word];
      }
    } catch (e) {
      console.warn('Invalid path');
      return;
    }
    return data;
  }
}
