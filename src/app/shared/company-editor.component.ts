import {Component, ElementRef, ViewChild} from '@angular/core';
import {SocietyService} from '../services/society.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'dash-company-editor',
  templateUrl: './company-editor.component.html',
  styleUrls: ['./company-editor.component.scss']
})
export class CompanyEditorComponent {
  companyName: string = undefined;
  firebaseData: string = undefined;
  error: string = undefined;
  loading: boolean = true;
  @ViewChild('companyFormName') nameInput: ElementRef<HTMLInputElement>;
  @ViewChild('companyFormFirebaseData') firebaseDataInput: ElementRef<HTMLTextAreaElement>;

  constructor(private societyService: SocietyService) {
    this.societyService.getSocietyData().pipe(take(1)).subscribe(data => {
      this.companyName = data.name;
      this.firebaseData = JSON.stringify(data.firebaseAccess, null, 2);
      this.loading = false;
    });
  }

  validate(): boolean {
    this.loading = true;
    const newName = this.nameInput.nativeElement.value;
    let firebaseData = this.firebaseDataInput.nativeElement.value;
    if (newName.length === 0) {
      this.error = 'The company name must be filled.';
      return false;
    }
    try {
      firebaseData = JSON.parse(firebaseData);
    } catch (_e) {
      this.error = 'The firebase connection data isn\'t valid';
      return false;
    }
    this.error = undefined;
    this.societyService.setCompanyName(newName).then(() => {
      return this.societyService.setFirebaseAccess(firebaseData);
    }).then(() => {
      this.loading = false;
    })
    return true;
  }
}
