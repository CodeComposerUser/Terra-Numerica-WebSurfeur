import { Injectable } from '@angular/core';
import { Graph } from 'src/app/models/Graph/graph';
import Swal from 'sweetalert2';
import * as d3 from 'd3';
import { Pawn } from 'src/app/models/Pawn/pawn';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _board_configuration: string | undefined;
  private _board_params: number[] = [];
  private _opponent_type: string | undefined;
  private _player_side: string = 'unknown';
  private _graph: Graph | undefined;
  private _collect_speed = 1;

  private svg: any;

  private goat_turn: boolean = false;
  private goat_win: boolean = false;
  private goat_token: Pawn | undefined;

  private goat_position: {x: number, y: number} = { x: -1, y: -1 };
  private cabbage_positions: {index: number, x: number, y: number}[] = [];
  private collected_cabbages: any[] = []

  constructor() { }

  /* Functions for game */

  startGame(svg: any): void {
    console.log('Starting game');
    this.svg = svg;
    let start_point;
    switch(this._graph?.typology) {
      case 'tree':
      default:
        start_point = this._graph?.nodes[0];
        break;
    }
    
    this.goat_turn = false;

    for(const node of this._graph?.nodes) {
      if(node.index === start_point.index) continue;
      this.svg.append('circle')
        .attr('fill', 'url(#cabbage)')
        .attr('r', 30)
        .attr('cx', node.x)
        .attr('cy', node.y)
        .attr('index', node.index)
        .attr('id', `cabbage${node.index}`)
        .on('click', (event: Event) => {
          // console.log('Event', event);
          this.handleClickOnCabbage(event.target!)
        })
      this.cabbage_positions.push(node);
    }

    if(this._graph !== undefined) {
      this.goat_position = { x: start_point.x, y: start_point.y };
      this.goat_token = new Pawn('goat', start_point, this._graph, this)
    }

    this.update();
  }

  private handleClickOnCabbage(target: EventTarget) {
    // console.log('Click on cabbage', target);
    if(this.goat_turn) {
      d3.select('#collect-limit').remove();
      d3.select('#details-informations')
        .append('p')
        .attr('id', 'collect-limit')
        .style('color', 'red')
        .text(() => "Ce n'est pas au tour du collecteur de choux")
      return
    }
    
    const selected_target = d3.select(target as any)
    if(this.collected_cabbages.find(t => t.attr('id') === selected_target.attr('id'))) {
      d3.select('#collect-limit').remove();
      const idx = this.collected_cabbages.findIndex(t => t.attr('id') === selected_target.attr('id'));
      if(idx !== -1) {
        this.collected_cabbages.splice(idx, 1);
        selected_target.attr('opacity', '1');
      }
    } else {
      if(this.collected_cabbages.length < this.collect_speed) {
        this.collected_cabbages.push(selected_target);
        selected_target.attr('opacity', '0.6');
      } else {
        d3.select('#collect-limit').remove();
        d3.select('#details-informations')
          .append('p')
          .attr('id', 'collect-limit')
          .style('color', 'red')
          .text(() => "Vous avez atteint la limite de récolte pour ce tour");
      }
    }
    this.displayCollectCount();
  }

  update() {
    if(this.opponent_type === 'ai') {
      
    } else {
      if(this.goat_turn === true) {
        d3.select('#details-informations')
          .style('color', 'brown')
          .text(() => "C'est au tour de la chèvre")
      } else if(!this.goat_turn) {
        d3.select('#details-informations')
          .style('color', 'green')
          .text(() => "C'est au tour du collecteur de choux");
        this.displayCollectCount();
      }
    }
  }

  private displayCollectCount() {
    d3.select('#collect-informations').remove();
    d3.select('#details-informations')
          .append('p')
          .attr('id', 'collect-informations')
          .text(() => `Nombre de choux restant à collecter : ${this.collect_speed - this.collected_cabbages.length}`)
  }

  private checkEnd() {
    return this.goat_win || this.cabbage_positions.length === 0;
  }

  updateGoatPosition(new_goat_position: {index: number, x: number, y: number}) {
    this.goat_position = {...new_goat_position}
    const idx = this.cabbage_positions.findIndex(n => n.index === new_goat_position.index)
    if(idx !== -1) {
      this.goat_win = true;
    }
  }

  validateTurn() {
    if(this.goat_turn === true) {
      this.updateGoatPosition(this.goat_token?.getPosition() as any)
      this.goat_token?.setState(environment.pawnWaitingTurn)
    } else {
      this.collectCabbages();
      this.goat_token?.setState(environment.pawnOnTurn)
    }

    if(this.checkEnd()) {
      if(this.goat_win) {
        Swal.fire('Fin de partie', 'La chèvre a gagner !', 'success');
      } else {
        Swal.fire('Fin de partie', 'Le collecteur de choux a gagné', 'success');
      }
    }

    this.goat_turn = !this.goat_turn;
    this.update()
  }

private collectCabbages() {
  /* console.log('COLLECTING CABBAGE'); */
  for(const cabbage of this.collected_cabbages) {
    const idx = this.cabbage_positions.findIndex(c =>{
      return c.index == cabbage.attr('index') 
    })
    
    if(idx !== -1) {
      this.cabbage_positions.splice(idx, 1)
      cabbage.remove();
    }
  }
  this.collected_cabbages = []
}


  /* Functions use to display the rules */

  private getRulesHtml() {
    return 'Need to add the rules...';
  }

  displayRules() {
    Swal.fire({
      icon: 'info',
      text: this.getRulesHtml()
    })
  }

  /* Getters */

  get board_conf(): string {
    if(this._board_configuration === undefined) {
      return 'unknwon';
    }
    return this._board_configuration;
  }

  get board_params(): number[] { return this._board_params; }

  get opponent_type(): string {
    if(this._opponent_type === undefined) {
      return 'unknown';
    }
    return this._opponent_type;
  }

  get player_side(): string { return this._player_side; }

  get graph(): Graph | undefined { return this._graph; }

  get collect_speed(): number { return this._collect_speed; }

  /* Setters */

  set board_conf(conf: string) { this._board_configuration = conf; }

  set board_params(params: number[]) { this._board_params = params; }

  set opponent_type(type: string) { this._opponent_type = type; }

  set player_side(side: string) { this._player_side = side; }

  set graph(graph: Graph | undefined) { this._graph = graph; }

  set collect_speed(speed: number) { this._collect_speed = speed; }

  reset() {
    this.goat_win = false;
  }

}
