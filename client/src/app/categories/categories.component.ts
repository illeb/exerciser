import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from './categories.service';
import { Category } from './category';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [CategoriesService]
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  displayedColumns = ['id', 'name', '.', '>'];
  constructor(private categoriesService: CategoriesService, private router: Router) { }
  
  ngOnInit(): void { 
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    })
  }

  goToCategoriesQuiz(category: Category) {
    this.router.navigateByUrl('/quiz')
  }

  joinCategories(category: Category) {

  }
}
