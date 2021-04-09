import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mode-selection',
  templateUrl: './mode-selection.page.html',
  styleUrls: ['./mode-selection.page.scss'],
})
export class ModeSelectionPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navToQuiz(info) {
    this.router.navigateByUrl("/quiz-page/"+info)
  }
}
