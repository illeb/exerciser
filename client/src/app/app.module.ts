import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppRoutingModule } from './app-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './menu/menu.component';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestsInterceptor } from './RequestsInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestsInterceptor, 
      multi: true 
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
