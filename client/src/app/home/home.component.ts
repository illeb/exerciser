import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { showSpinner } from '@state/ui/ui.actions';
import { selectSpinner } from '@state/ui/ui.selectors';
import { SpinnerService } from '../shared/spinner/spinner.service';

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
  constructor(private store: Store<AppState>, public spinnerService: SpinnerService) { }

  generateRandom() {
    this.spinnerService.showSpinner();

    setTimeout(() => {
      // this.spinnerService.hideSpinner();
    }, 3000)
  }

}
