import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <mat-progress-spinner color="primary">
    </mat-progress-spinner>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  constructor() { }

}
