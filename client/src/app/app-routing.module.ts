import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { QuestionnarieComponent } from './quiz/quiz.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'quiz', component: QuestionnarieComponent},
  { path: 'categories', component: CategoriesComponent },
  { 
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
