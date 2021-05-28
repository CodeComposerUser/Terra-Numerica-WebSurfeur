import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-configuration-menu',
  templateUrl: './configuration-menu.component.html',
  styleUrls: ['./configuration-menu.component.scss']
})
export class ConfigurationMenuComponent implements OnInit {

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  displayRules() {
    this.gameService.displayRules()
  }

}
