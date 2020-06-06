import {Component} from '@angular/core';
import {NbWindowRef} from '@nebular/theme';
import {DataModel} from '../../../../models/page.model';

@Component({
  selector: 'dash-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {

  context: {model: DataModel[], row: string[]} = {model: [], row: []};

  constructor(protected windowRef: NbWindowRef) {
    console.log(windowRef.config.context);
    this.context = windowRef.config.context as {model: DataModel[], row: string[]};
  }

  minimize() {
    this.windowRef.minimize();
  }

  close() {
    this.windowRef.close();
  }

}
