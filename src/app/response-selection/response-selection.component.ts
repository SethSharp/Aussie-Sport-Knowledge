
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-response-selection',
  templateUrl: './response-selection.component.html',
  styleUrls: ['./response-selection.component.scss'],
})
export class ResponseSelectionComponent implements OnInit {
  // Dynamic inputs passed through by other pages
  @Input()
  questions: any;

  @Input()
  questionPosition: number;

  @Input()
  answerFunc: (i: number, event: any) => void;

  constructor() {}

  ngOnInit() {}

  t(i, e=undefined) {
    // Calls answerFunc in the corresponding page
    this.answerFunc(i, e)
  }
}
