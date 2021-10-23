import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { showSpinner } from '@state/ui/ui.actions';
import { selectSpinner } from '@state/ui/ui.selectors';

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
  spinner$ = this.store.select(selectSpinner);

  constructor(private store: Store<AppState>) {
  }

  generateRandom() {
    this.store.dispatch(showSpinner({}));
  }

}
