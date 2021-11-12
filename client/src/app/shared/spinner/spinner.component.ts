import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <mat-spinner color="primary">
    </mat-spinner>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {

  constructor() { }

}
