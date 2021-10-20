import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <mat-card>
      <mat-card-title>Generate test</mat-card-title>
      <mat-card-subtitle>Random</mat-card-subtitle>
      <mat-card-actions>
        <button mat-button (click)="generateRandom()">Generate</button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor() { }

  generateRandom() {
    console.log('generate random test');
  }

}
