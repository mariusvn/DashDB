import { Component } from '@angular/core';
import {NbWindowRef} from '@nebular/theme';

@Component({
  selector: 'dash-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  context: {text: string, callback: () => void} = undefined;

  constructor(private windowRef: NbWindowRef) {
    this.context = windowRef.config.context as {text: string, callback: () => void};
  }

  close(executeCallback = true) {
    if (executeCallback)
      setTimeout(this.context.callback);
    this.windowRef.close();
  }
}
