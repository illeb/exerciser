import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { showSpinner, hideSpinner } from '@state/ui/ui.actions';
import { selectSpinner } from '@state/ui/ui.selectors';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _spinnerState$ = this.store.select(selectSpinner);
  
  get spinnerState$() {
    return this._spinnerState$;
  }

  constructor(private store: Store<AppState>) { }

  showSpinner(caption?: string) {
    this.store.dispatch(showSpinner({
      caption
    }));
  }

  hideSpinner() {
    this.store.dispatch(hideSpinner())
  }
}
