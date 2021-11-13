import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner/spinner.component';
import { SpinnerService } from './spinner/spinner.service';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesService } from './services/categories.service';


@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  exports: [
    SpinnerComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { 
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [ 
        SpinnerService,
        CategoriesService
      ]
    }
  }
}
