import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurationMenuComponent } from './configuration-menu/configuration-menu.component';
import { GameModeMenuComponent } from './game-mode-menu/game-mode-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigurationMenuComponent,
    GameModeMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
