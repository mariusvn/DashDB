import {Component} from '@angular/core';
import {SocietyService} from '../../services/society.service';
import Page from '../../../models/page.model';
import {PageService} from '../../services/page.service';
import {DatabaseService} from '../../services/database.service';

@Component({
  selector: 'dash-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  public companyName: string = '';
  public pages: {title: string}[] = [];

  constructor(private societyService: SocietyService, private pageService: PageService, private databaseService: DatabaseService) {
    this.societyService.getSocietyData().subscribe(data => {
      this.companyName = data.name;
    });
    this.pageService.getPages().subscribe(data => {
      data.forEach(page => {
        this.pages.push({title: page.name});
      })
    });
  }
}
