import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestsInterceptor } from './RequestsInterceptor';
import { QuestionarrieChooserComponent } from './shared/questionarrie-chooser/questionarrie-chooser.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { UIReducer } from './state/ui/ui.reducer';
import { SharedModule } from './shared/shared.module';
import { QuizReducer } from '@state/quiz/quiz.reducer';
import { EffectsModule } from '@ngrx/effects';
import { QuizEffects } from '@state/quiz/quiz.effects';
import { QuestionnarieComponent } from './quiz/quiz.component';
import { QuestionComponent } from './quiz/question/question.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    CategoriesComponent,
    QuestionarrieChooserComponent,
    QuestionnarieComponent,
    QuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
      ui: UIReducer,
      quiz: QuizReducer
    }),
    EffectsModule.forRoot([
      QuizEffects
    ]),
    SharedModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestsInterceptor,
      multi: true
    },  
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
