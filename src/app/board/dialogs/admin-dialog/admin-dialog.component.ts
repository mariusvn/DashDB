import { Component } from '@angular/core';
import {NbWindowService} from '@nebular/theme';
import {take, takeUntil} from 'rxjs/operators';
import {SocietyService} from '../../../services/society.service';

@Component({
  selector: 'dash-admin-dialog',
  templateUrl: './admin-dialog.component.html',
  styleUrls: ['./admin-dialog.component.scss']
})
export class AdminDialogComponent {
  companyName: string = undefined;
  firebaseData: string = undefined;

  constructor(private societyService: SocietyService) {
    this.societyService.getSocietyData().pipe(take(1)).subscribe(data => {
      this.companyName = data.name;
      this.firebaseData = JSON.stringify(data.firebaseAccess, null, 2);
    });
  }


}
