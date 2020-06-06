import {Component} from '@angular/core';
import Page, {DataModel} from '../../../models/page.model';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {take} from 'rxjs/operators';
import {PageService} from '../../services/page.service';
import {DatabaseService} from '../../services/database.service';
import * as firebase from 'firebase';
import 'firebase/database';
import {NbWindowService} from '@nebular/theme';
import {EditDialogComponent} from '../dialogs/edit-dialog/edit-dialog.component';

@Component({
  selector: 'dash-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent {
  public pageId: string = undefined;
  public page: Page = undefined;
  public rows: any[][] = [];
  private db: firebase.database.Database;

  constructor(private router: ActivatedRoute,
              private pageService: PageService,
              private databaseService: DatabaseService,
              private windowService: NbWindowService) {
    router.paramMap.subscribe((params: ParamMap) => {
      this.rows = [];
      this.pageId = params.get('boardId');
      this.pageService.getPage(this.pageId).pipe(take(1)).subscribe(page => {
        this.page = page

        this.databaseService.onDatabaseConnected(() => {
          this.db = databaseService.getSecondaryFirebase().database();
          this.getRowsData.bind(this)();
        }, this);
      });
    });
  }

  public openEditDialog(index: number) {
    this.windowService.open(EditDialogComponent, {title: 'Edit ' + this.rows[this.page.main][index], context: {
        model: this.page.model,
        row: this.getRowContent(index)
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
    for (let index = 0; index < this.page.model.length; index++) {
      if (index === this.page.main)
        continue;
      await this.getRowData(this.page.model[index], index);
    }
  }

  private getRowData = (rowData: DataModel, index: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        if (rowData.keysAreProperties) {
          this.db.ref(rowData.path).on('value', (data) => {
            this.rows[index] = Object.keys(data.val());
            resolve();
          });
        } else {
          if (this.page.main === index) {
            console.warn('Main must be keys as properties');
            return resolve();
          }
          const newPath = rowData.path;
          this.rows[index] = [];
          this.rows[this.page.main].forEach((id, i) => {
            const path = rowData.path.replace(/:([a-zA-Z]*?)(\/|$|\n)/gm, '' + id + '$2');
            this.db.ref(path).on('value', (data) => {
              this.rows[index][i] = data.val();
              if (this.rows[this.page.main].length - 1 === i) {
                resolve();
              }
            })
          });
        }
      } catch (e) {
        console.warn(e);
        if (!this.rows[this.page.main]) {
          console.warn('Main row not loaded');
        } else
          this.rows[this.page.main].forEach((_o, i) => {
            this.rows[index][i] = -4;
          });
        reject();
      }
    });
  }

  private getCurrentMain(index: number) {
    return this.rows[this.page.main][index];
  }
}
