import {Component} from '@angular/core';
import {NbToastrService, NbWindowRef} from '@nebular/theme';
import {DataModel} from '../../../../models/page.model';
import {DatabaseService} from '../../../services/database.service';

@Component({
  selector: 'dash-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {

  context: {
    model: DataModel[],
    row: string[],
    main: number,
    namespace: string,
    type: 'edit' | 'create'
  } = {
    model: [],
    row: [],
    main: 0,
    namespace: '',
    type: undefined
  };

  constructor(private windowRef: NbWindowRef,
              private databaseService: DatabaseService,
              private toastrService: NbToastrService) {
    this.context = windowRef.config.context as {
      model: DataModel[],
      row: string[],
      main: number,
      namespace: string,
      type: 'edit' | 'create'
    };
    if (this.context.type === 'create')
      this.context.row = this.getEmptyRow();
  }

  private static getPath(path: string, id: string): string {
    return path.replace(/:([a-zA-Z]*?)(\/|$|\n)/gm, '' + id + '$2');
  }

  private static splitPath(path: string): {pre: string, key: string} {
    const rest = path.substring(0, path.lastIndexOf('/'));
    const last = path.substring(path.lastIndexOf('/') + 1, path.length);
    return {pre: rest, key: last};
  }

  private getEmptyRow(): string[] {
    const res: string[] = [];
    // @ts-ignore
    for (const d of this.context.model)
      res.push('');
    return res;
  }

  minimize() {
    this.windowRef.minimize();
  }

  editData(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const updates = {};
      for (let i = 0; i < this.context.model.length; i++) {
        const currentModel = this.context.model[i];
        if (currentModel.constant || i === this.context.main)
          continue;
        const newPath = EditDialogComponent.getPath('/' + this.context.namespace + '/' + currentModel.path, this.context.row[this.context.main]);
        // const pathData = EditDialogComponent.splitPath(newPath);
        // if (!updates[pathData.pre])
        //   updates[pathData.pre] = {};
        // updates[pathData.pre][pathData.key] = this.context.row[i];
        updates[newPath] = this.context.row[i];
      }
      this.databaseService.onDatabaseConnected(() => {
        const db = this.databaseService.getSecondaryFirebase().database();
        db.ref().update(updates).then((d) => {
          resolve();
        }).catch((err) => {
          console.warn(err);
          reject(err);
        })
      }, this);
    });
  }

  async close(save = false) {
    if (save) {
      if (this.context.type === 'create') {
        if (this.context.row[this.context.main] === '') {
          this.toastrService.danger(`The ${this.context.model[this.context.main].name} field cannot be empty`, 'Error');
          return;
        } else {
          const db = this.databaseService.getSecondaryFirebase().database();
          const path = '/' + this.context.namespace + '/' +
            this.context.model[this.context.main].path +
            (this.context.model[this.context.main].path !== '' ? '/' : '') +
            this.context.row[this.context.main];
          const snap = await db.ref().child(path).once('value');
          if (snap.exists()) {
            this.toastrService.danger(`The ${this.context.model[this.context.main].name} field already exists`, 'Error');
            return;
          }
        }

      }
      this.editData();
    }
    this.windowRef.close();
  }


}
