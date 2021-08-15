import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent as CategoriesTableComponent } from './categories/categories.component';
import { QuestionnarieComponent } from './categories/questionarrie/questionarrie.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'quiz', component: CategoriesTableComponent, children: [
    { path: 'start', component: QuestionnarieComponent }
  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
