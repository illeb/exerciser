import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from './categories.service';
import { Category } from '../model/category';
import { map } from 'rxjs/operators'
import { QuizGroupRequest } from './QuizGroupRequest';
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
  constructor(private categoriesService: CategoriesService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
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
