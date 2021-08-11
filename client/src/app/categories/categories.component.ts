import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './categories.service';

@Component({
  selector: 'app-categories',
  template: `
    <p>
      categories works!
    </p>
  `,
  styleUrls: ['./categories.component.scss'],
  providers: [CategoriesService]
})
export class CategoriesComponent implements OnInit {

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void { 
    this.categoriesService.getCategories().subscribe((result) => {
      console.log('result', result);
    })

  }
}
