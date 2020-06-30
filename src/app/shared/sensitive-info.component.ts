import { Component } from '@angular/core';

@Component({
  selector: 'dash-sensitive-info',
  template: `
    <div class="wrapper">
      <button *ngIf="!showContent" (click)="showContent = true" nbButton>Show</button>
      <div *ngIf="showContent">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      button {
        align-self: center;
      }
    `
  ]
})
export class SensitiveInfoComponent {
  public showContent: boolean = false;
}
