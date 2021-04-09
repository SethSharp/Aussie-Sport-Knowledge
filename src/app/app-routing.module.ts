import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home/:username',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login-page',
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
    path: 'profile-page/:username',
    loadChildren: () => import('./profile-page/profile-page.module').then( m => m.ProfilePagePageModule)
  },
  {
    path: 'mode-selection',
    loadChildren: () => import('./mode-selection/mode-selection.module').then( m => m.ModeSelectionPageModule)
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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
