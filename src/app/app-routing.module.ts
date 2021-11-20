import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'quiz-page/:information',
    loadChildren: () => import('./quiz-page/quiz-page.module').then( m => m.QuizPagePageModule)
  },
  {
    path: 'multiplayer',
    loadChildren: () => import('./multiplayer/multiplayer.module').then( m => m.MultiplayerPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile-page/profile-page.module').then( m => m.ProfilePagePageModule)
  },
  {
    path: 'login-page',
    loadChildren: () => import('./login-page/login-page.module').then( m => m.LoginPagePageModule)
  },
  {
    path: 'question-modal',
    loadChildren: () => import('./question-modal/question-modal.module').then( m => m.QuestionModalPageModule)
  },
  {
    path: 'leaderboard',
    loadChildren: () => import('./leaderboard/leaderboard.module').then( m => m.LeaderboardPageModule)
  },
  {
    path: 'question-summary',
    loadChildren: () => import('./question-summary/question-summary.module').then( m => m.QuestionSummaryPageModule)
  },
  {
    path: 'multiplayer-quiz',
    loadChildren: () => import('./multiplayer-quiz/multiplayer-quiz.module').then( m => m.MultiplayerQuizPageModule)
  },
  {
    path: 'charts',
    loadChildren: () => import('./charts/charts.module').then( m => m.ChartsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
