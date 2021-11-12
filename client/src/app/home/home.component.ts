import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.state';
import { filter, map, mergeMap } from 'rxjs/operators';
import { QuestionarrieChooserComponent } from '../shared/questionarrie-chooser/questionarrie-chooser.component';
import { SpinnerService } from '../shared/spinner/spinner.service';

@Component({
  selector: 'app-home',
  template: `
    <mat-card>
      <mat-card-title>Generate test</mat-card-title>
      <mat-card-subtitle>Random</mat-card-subtitle>
      <mat-card-actions>
        <button mat-button (click)="openModal()">Generate new test</button>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private store: Store<AppState>, 
    public spinnerService: SpinnerService, 
    activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router) {

    activatedRoute.queryParamMap.pipe(
      filter(params => params.has('modal')),
      mergeMap(() => this.showQuestionarrieChooser())
    ).subscribe(params => {
      this.showQuestionarrieChooser();
    })
  }

  openModal() {
    this.router.navigate([], {
      queryParams: { modal: 'open'},
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  private showQuestionarrieChooser() {
    return this.dialog.open(QuestionarrieChooserComponent, { panelClass: 'modalM' } ).afterClosed().pipe(
      map(result => {
        return result;
      })
    );
  }
}
