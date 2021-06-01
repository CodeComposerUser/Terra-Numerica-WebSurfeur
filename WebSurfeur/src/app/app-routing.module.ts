import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { ConfigurationMenuComponent } from './components/configuration-menu/configuration-menu.component';
import { GameModeMenuComponent } from './components/game-mode-menu/game-mode-menu.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'game-mode-selection'},
  {path: 'configuration', component: ConfigurationMenuComponent},
  {path: 'game-mode-selection', component: GameModeMenuComponent},
  {path: 'board', component: BoardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
