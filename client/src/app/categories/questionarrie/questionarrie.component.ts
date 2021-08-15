import { Component, OnInit } from '@angular/core';
import { QuestionarrieService } from './questionarrie.service';

@Component({
  selector: 'app-questionnarie',
  template: `
    <p>
      questionarrie works!
    </p>
  `,
  styleUrls: ['./questionarrie.component.scss'],
  providers: [QuestionarrieService]
})
export class QuestionnarieComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
