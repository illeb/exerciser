import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { QuizGeneratorComponent } from './quizGenerator/quiz-generator.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'categories', component: CategoriesComponent },
  { path: 'quizGenerator', component: QuizGeneratorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
