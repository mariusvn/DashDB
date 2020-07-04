import {Component} from '@angular/core';
import {NbWindowRef} from '@nebular/theme';
import {DataModel} from '../../../../models/page.model';
import {DatabaseService} from '../../../services/database.service';

@Component({
  selector: 'dash-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {

  context: {model: DataModel[], row: string[], main: number, namespace: string} = {model: [], row: [], main: 0, namespace: ''};

  constructor(private windowRef: NbWindowRef,
              private databaseService: DatabaseService) {
    this.context = windowRef.config.context as {model: DataModel[], row: string[], main: number, namespace: string};
  }

  private static getPath(path: string, id: string): string {
    return path.replace(/:([a-zA-Z]*?)(\/|$|\n)/gm, '' + id + '$2');
  }

  private static splitPath(path: string): {pre: string, key: string} {
    const rest = path.substring(0, path.lastIndexOf('/'));
    const last = path.substring(path.lastIndexOf('/') + 1, path.length);
    return {pre: rest, key: last};
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
        console.log(newPath);
        // const pathData = EditDialogComponent.splitPath(newPath);
        // if (!updates[pathData.pre])
        //   updates[pathData.pre] = {};
        // updates[pathData.pre][pathData.key] = this.context.row[i];
        updates[newPath] = this.context.row[i];
      }
      console.log(updates);
      this.databaseService.onDatabaseConnected(() => {
        console.log('database reached');
        const db = this.databaseService.getSecondaryFirebase().database();
        db.ref().update(updates).then((d) => {
          console.log('ok', d);
          resolve();
        }).catch((err) => {
          console.log('pa ok');
          console.warn(err);
          reject(err);
        })
      }, this);
    });
  }

  close() {
    console.log(this.context);
    this.editData();
    this.windowRef.close();
  }


}
