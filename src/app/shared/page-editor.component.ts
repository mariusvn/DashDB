import {Component, OnInit} from '@angular/core';
import {PageService} from '../services/page.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'dash-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements OnInit {

  pages = undefined;

  constructor(private pageService: PageService) {}

  ngOnInit() {
    this.pageService.getPages()
      .pipe(take(1))
      .subscribe(pages => {
      this.pages = pages;
      console.log(pages);
    });
  }
}
