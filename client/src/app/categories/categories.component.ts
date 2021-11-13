import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../shared/services/categories.service';
import { Category } from '../model/category';
import { filter, finalize, map, mergeMap } from 'rxjs/operators'
import { SpinnerService } from '../shared/spinner/spinner.service';
import { MatDialog } from '@angular/material/dialog';
import { QuestionarrieChooserComponent } from '../shared/questionarrie-chooser/questionarrie-chooser.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [CategoriesService]
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns = ['id', 'name', '.', '>'];
  constructor(private categoriesService: CategoriesService, 
    private router: Router,
    public dialog: MatDialog,
    public spinnerService: SpinnerService,
    activatedRoute: ActivatedRoute) {
      activatedRoute.queryParamMap.pipe(
        filter(params => params.has('modal')),
        mergeMap(() => this.showQuestionarrieChooser())
      ).subscribe();
  }

  ngOnInit(): void {
    this.spinnerService.showSpinner();
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.spinnerService.hideSpinner()
    })
  }

  goToCategoriesQuiz(category: Category) {
    this.router.navigate([], {
      queryParams: { modal: 'open'},
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  joinCategories(category: Category) {

  }

  private showQuestionarrieChooser() {
    return this.dialog.open(QuestionarrieChooserComponent, { panelClass: 'modalM' } ).afterClosed().pipe(
      map(result => {
        return result;
      })
    );
  }
}
