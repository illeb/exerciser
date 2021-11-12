import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from './categories.service';
import { Category } from '../model/category';
import { finalize, map } from 'rxjs/operators'
import { SpinnerService } from '../shared/spinner/spinner.service';
import { MatDialog } from '@angular/material/dialog';
import { QuestionarrieChooserComponent } from './questionarrie-chooser/questionarrie-chooser.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [CategoriesService]
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns = ['id', 'name', '.', '>'];
  constructor(private categoriesService: CategoriesService, private router: Router, public dialog: MatDialog, public spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.spinnerService.showSpinner();
    this.categoriesService.getCategories()
    .pipe(
      finalize(() => {
      }
    )).subscribe((categories) => {
      this.categories = categories;
      this.spinnerService.hideSpinner()
    })
  }

  goToCategoriesQuiz(category: Category) {
    this.showQuestionarrieChooser().subscribe(result => {
      // const quizGroupRequest = new QuizGroupRequest([category], );
      // this.categoriesService.getQuizzes()
      this.router.navigateByUrl('/quiz', { state: { category }});
    }, () => {})
  }

  joinCategories(category: Category) {

  }

  private showQuestionarrieChooser() {
    return this.dialog.open(QuestionarrieChooserComponent, {panelClass: 'modalM'} ).afterClosed().pipe(
      map(result => {
        return result;
      })
    )}
}
