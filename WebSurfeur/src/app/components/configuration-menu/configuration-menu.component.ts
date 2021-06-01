import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParamBoundary } from 'src/app/models/param-boundary.model';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-configuration-menu',
  templateUrl: './configuration-menu.component.html',
  styleUrls: ['./configuration-menu.component.scss']
})
export class ConfigurationMenuComponent implements OnInit {

  public configurations = ['tree', 'conf2', 'conf3'];
  public selected_configuration: string = 'tree';
  public configuration_param_boundaries: { [index: string] : {param1: ParamBoundary, param2: ParamBoundary | undefined}} = {
    tree: {
      param1: {min: 2, max: 10},
      param2: {min: 1, max: 10}
    },
    conf2: {
      param1: {min: 2, max: 5},
      param2: undefined
    },
    conf3: {
      param1: {min: 2, max: 5},
      param2: {min: 1, max: 10}
    }
  }
  public param1: number = 0;
  public param2: number = 0;

  public opponent_types = ['ai', 'player'];
  private selected_opponent_type = 'player' // 'ai';

  public sides = ['goat', 'harvest'];
  private player_side = 'goat';

  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    this.initParams();
  }

  private initParams(): void {
    this.param1 = this.configuration_param_boundaries[this.selected_configuration].param1.min;
    if(this.configuration_param_boundaries[this.selected_configuration].param2 !== undefined) {
      this.param2 = this.configuration_param_boundaries[this.selected_configuration].param2!.min;
    } else { this.param2 = -1 }
  }

  displayRules() {
    this.gameService.displayRules()
  }

  /* Functions for board configuration selection */

  getConfigurationName(configuration: string): string {
    switch (configuration) {
      case 'tree':
        return 'Arbre';
      case 'conf2':
        return 'Configuration 2';
      case 'conf3':
        return 'Configuration 3';
      default:
        return 'Configuration inconnue';
    }
  }

  selectConfiguration(configuration: string) {
    this.selected_configuration = configuration;
    this.initParams();
  }

  isSelectedConfiguration(configuration: string): string {
    return this.selected_configuration === configuration ? 'selected' : ''
  }

  /* Functions for inputs boundaries */

  checkValueRightness(event: FocusEvent) {
    const target = event.target as any
    if(target.value !== '') {
      if(+target.value < target.min) {
        target.value = target.min;
      } else if(target.max !== '' && +target.value > target.max) {
        target.value = target.max;
      }
    } else {
      target.value = target.min;
    }
  }

  /* Functions for opponent type selection */

  getOpponentTypeMessage(type: string): string {
    switch (type) {
      case 'ai':
        return 'Jouer contre un ordinateur';
      case 'player':
        return 'Jouer à 2 joueurs';
      default:
        return 'Adversaire inconnue';
    }
  }

  selectOpponentType(type: string) {
    this.selected_opponent_type = type;
  }

  isSelectedOpponentType(type: string): string {
    return this.selected_opponent_type === type ? 'selected' : '';
  }

  isOnePlayerGame(): boolean {
    return this.selected_opponent_type === 'ai'
  }
  
  /* Functions for side selection */

  getSideName(side: string): string {
    switch (side) {
      case 'goat':
        return 'Chèvre';
      case 'harvest':
        return 'Collecteur de choux';
      default:
        return 'Camp inconnue';
    }
  }

  selectSide(side: string) {
    this.player_side = side;
  }

  isSelectedSide(side: string): string {
    return this.player_side === side ? 'selected' : '';
  }

  /* Start game function */

  startGame() {
    console.log('Starting game')
    this.gameService.board_conf = this.selected_configuration;
    this.gameService.opponent_type = this.selected_opponent_type;
    this.gameService.player_side = this.player_side;
    this.gameService.board_params = [this.param1, this.param2];
    this.router.navigate(['/board'])
  }

}
