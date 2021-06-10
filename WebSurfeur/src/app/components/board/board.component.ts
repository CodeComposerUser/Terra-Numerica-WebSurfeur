import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game/game.service';
import * as d3 from 'd3';
import { GraphService } from 'src/app/services/graph/graph.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @ViewChild('visualiser', { static: true })
  visualiser: ElementRef | undefined;

  private svg: any;

  constructor(private router: Router,
              private gameService: GameService,
              private graphService: GraphService,
              private renderer: Renderer2) { }

  ngOnInit(): void {
    this.gameService.reset()
    const width = this.visualiser?.nativeElement.offsetWidth;
    const height = this.visualiser?.nativeElement.offsetHeight;
    /* console.log('Visu', this.visualiser) */
    this.renderer.setStyle(this.visualiser?.nativeElement, 'visibility', 'hidden')
    this.svg = d3.select('#visualiser')
      .append('svg')
        .attr('id', 'mainBoard')
        .attr('width', width)
        .attr('height', height);
    this.graphService.drawGraph(this.svg);
    setTimeout(() => {
      this.gameService.startGame(this.svg)
      this.renderer.setStyle(this.visualiser?.nativeElement, 'visibility', 'visible')
      /* d3.select('#details-informations')
        .style('color', 'brown')
        .text(() => 'C\'est au tour de la chèvre de jouer') */
    }, 3000)
    /* this.svg.append('circle')
      .attr('fill', 'url(#goat)')
      .attr('cx', 100)
      .attr('cy', 100)
      .attr('r', 40)
      
    this.svg.append('circle')
      .attr('fill', 'url(#cabbage)')
      .attr('cx', 100)
      .attr('cy', 200)
      .attr('r', 40) */
  }

  replay(): void {
    this.clearSvg();
    this.ngOnInit();
  }

  goBackToMenu(): void {
    this.router.navigate(['/configuration']);
  }

  private clearSvg(): void {
    d3.selectAll('svg').remove();
  }

  validateTurn() {
    this.gameService.validateTurn()
  }

}
