import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParamBoundary } from 'src/app/models/param-boundary.model';
import { GameService } from 'src/app/services/game/game.service';
import { GraphService } from 'src/app/services/graph/graph.service';

@Component({
  selector: 'app-configuration-menu',
  templateUrl: './configuration-menu.component.html',
  styleUrls: ['./configuration-menu.component.scss']
})
export class ConfigurationMenuComponent implements OnInit {

  public configurations = ['tree', 'conf2', 'conf3'];
  public selected_configuration: string = 'tree';
  public configuration_param_boundaries: { [index: string]: { param1: ParamBoundary, param2: ParamBoundary | undefined } } = {
    tree: {
      param1: { min: 2, max: 25 },
      param2: { min: 1, max: 10 }
    },
    conf2: {
      param1: { min: 2, max: 20 },
      param2: undefined
    },
    conf3: {
      param1: { min: 2, max: 15 },
      param2: { min: 1, max: 10 }
    }
  }
  public param1: number = 0;
  public param2: number = 0;

  public opponent_types = ['ai', 'player'];
  private selected_opponent_type = 'player' // 'ai';

  public sides = ['goat', 'harvest'];
  private player_side = 'goat';

  public collect_speed = 1;

  public selected_level = 'easy';

  constructor(private gameService: GameService, private router: Router, private graphService: GraphService) { }

  ngOnInit(): void {
    this.initParams();
  }

  private initParams(): void {
    this.param1 = this.configuration_param_boundaries[this.selected_configuration].param1.min;
    if (this.configuration_param_boundaries[this.selected_configuration].param2 !== undefined) {
      this.param2 = this.configuration_param_boundaries[this.selected_configuration].param2!.min;
    } else { this.param2 = -1 }
  }

  displayRules() {
    this.gameService.displayRules()
  }

  goBack() {
    this.router.navigate(['/game-mode-selection'])
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
    if(!configuration.includes('conf')) {
      this.selected_configuration = configuration;
    }
    this.initParams();
  }

  isSelectedConfiguration(configuration: string): string {
    let classes = this.selected_configuration === configuration ? 'selected' : ''
    classes += ` ${configuration.includes('conf') ? 'disabled' : ''}`
    return classes
  }

  /* Functions for inputs */

  checkValueRightness(event: FocusEvent) {
    const target = event.target as any
    if (target.value !== '') {
      if (+target.value < target.min) {
        target.value = target.min;
      } else if (target.max !== '' && +target.value > target.max) {
        target.value = target.max;
      }
    } else {
      target.value = target.min;
    }
  }

  getParam1Name() {
    switch (this.selected_configuration) {
      case 'tree':
        return 'Nombre de noeuds :';
      case 'conf2':
        return 'Nombre de noeuds :';
      case 'conf3':
        return 'Nombre de noeuds :';
      default:
        return 'Unknown but usefeul (I think)'
    }
  }

  getParam2Name() {
    switch (this.selected_configuration) {
      case 'tree':
        return 'Arité :';
      case 'conf2':
        return 'Arité :';
      case 'conf3':
        return 'Arité :';
      default:
        return 'Unknown but usefeul (I think)'
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
    if(type !== 'ai') {
      this.selected_opponent_type = type;
    } else {
      alert('L\'option sélectionnée n\'est pas disponible.')
    }
  }

  isSelectedOpponentType(type: string): string {
    return this.selected_opponent_type === type ? `selected ${type}` : type;
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

  /* Functions for the level selection */

  isSelectedLevel(level: string): string {
    return this.selected_level === level ? 'selected' : '';
  }

  /* Start game function */

  startGame() {
    this.gameService.board_conf = this.selected_configuration;
    this.gameService.opponent_type = this.selected_opponent_type;
    this.gameService.player_side = this.player_side;
    const params = [this.param1, this.param2]
    this.gameService.board_params = params;
    this.gameService.graph = this.graphService.generateGraph(this.selected_configuration, params);
    this.gameService.collect_speed = this.collect_speed;
    
    this.router.navigate(['/board'])
  }

}
