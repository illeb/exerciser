import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { selectSpinner } from '@state/ui/ui.selectors';

@Component({
  selector: 'app-root',
  template: `
    <app-spinner *ngIf="(spinner$ | async).visible"></app-spinner>
    <app-menu>
      <router-outlet>
      </router-outlet>
    </app-menu>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pa-concourse';
  spinner$ = this.store.select(selectSpinner);

  constructor(private store: Store<AppState>) {
    

  }
}
