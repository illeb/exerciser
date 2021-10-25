import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { selectSpinner } from '@state/ui/ui.selectors';
import { SpinnerService } from './shared/spinner/spinner.service';

@Component({
  selector: 'app-root',
  template: `
    <app-spinner *ngIf="(spinnerService.spinnerState$ | async).visible"></app-spinner>
    <app-menu>
      <router-outlet>
      </router-outlet>
    </app-menu>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pa-concourse';
  spinnerService: SpinnerService
  constructor(spinnerService: SpinnerService) {
    this.spinnerService = spinnerService;
  }
}
