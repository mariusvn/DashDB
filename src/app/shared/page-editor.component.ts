import {Component, OnInit} from '@angular/core';
import {PageService} from '../services/page.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'dash-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements OnInit {

  public pages = undefined;
  public error = undefined;

  constructor(private pageService: PageService) {}

  ngOnInit() {
    this.pageService.getPages()
      .pipe(take(1))
      .subscribe(pages => {
      this.pages = pages;
    });
  }

  deleteField(pageIndex, fieldIdx) {
    this.pages[pageIndex].model.splice(fieldIdx, 1);
  }

  addField(pageIndex) {
    this.pages[pageIndex].model.push({name: '', path: '', type: ''});
  }

  setMain(pageIndex, mainStr) {
    const nbr = parseInt(mainStr, 10);
    this.pages[pageIndex].main = nbr;
  }

  addPage() {
    console.log(this.pages);
    this.pages.push({
      main: 0,
      model: [{
        constant: true,
        keysAreProperties: false,
        name: '',
        path: '',
        type: ''
      }],
      name: '',
      namespace: '',
      position: this.pages.length,
      slug: ''
    });
  }

  save() {
    const ret = this.pageService.checkPagesModel(this.pages);
    console.log(ret);
    if (ret.success) {
      this.error = undefined;
    } else {
      this.error = ret.reason;
    }
    this.pageService.setPages(this.pages);
  }
}
