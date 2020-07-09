import {Component, OnInit} from '@angular/core';
import {PageService} from '../services/page.service';
import {take} from 'rxjs/operators';
import {NbWindowRef} from '@nebular/theme';

@Component({
  selector: 'dash-page-editor',
  templateUrl: './page-editor.component.html',
  styleUrls: ['./page-editor.component.scss']
})
export class PageEditorComponent implements OnInit {

  public pages = undefined;
  public error = undefined;
  public loading = false;

  constructor(private pageService: PageService, private windowRef: NbWindowRef) {}

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

  movePage(event: MouseEvent, pageIndex: number, direction: 'up' | 'down'): void {
    event.stopPropagation();
    if (
      (pageIndex === 0 && direction === 'up') ||
      (pageIndex === this.pages.length - 1 && direction === 'down')
    ) {
      return;
    }
    const factor = direction === 'up' ? -1 : 1;
    this.pages[pageIndex].position += factor;
    this.pages[pageIndex + factor].position += factor * -1;
    const tempPage = this.pages[pageIndex + factor];
    this.pages[pageIndex + factor] = this.pages[pageIndex];
    this.pages[pageIndex] = tempPage;
  }

  addPage() {
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
    this.loading = true;
    const ret = this.pageService.checkPagesModel(this.pages);
    if (ret.success) {
      this.error = undefined;
    } else {
      this.error = ret.reason;
    }
    this.pageService.setPages(this.pages).then(() => {
      this.loading = false;
      this.windowRef.close();
      setTimeout(() => {
        window.location.reload();
      }, 100)
    }).catch(() => {
      this.loading = false;
    })
  }
}
