import {Component, OnInit} from '@angular/core';
import {PageService} from '../../services/page.service';
import Page from '../../../models/page.model';
import {take} from 'rxjs/operators';

@Component({
  selector: 'dash-home-view',
  templateUrl: 'home-view.component.html',
  styleUrls: ['home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
  pageStats: {pageNumber: number, propertyNumber: number} = undefined;

  constructor(private pageService: PageService) {}

  ngOnInit() {
    this.getPageStats().then(res => this.pageStats = res);
  }

  getPageStats(): Promise<{pageNumber: number, propertyNumber: number}> {
    return new Promise<{pageNumber: number, propertyNumber: number}>((resolve) => {
      this.pageService.getPages().pipe(take(1)).subscribe(pages => {
        const pageNumber = pages.length;
        let propertyNumber = 0;
        for (const page of pages) {
          propertyNumber += page.model.length;
        }
        resolve({pageNumber, propertyNumber});
      });
    });
  }
}
