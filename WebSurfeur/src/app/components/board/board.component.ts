import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  constructor(private router: Router, private gameService: GameService, private graphService: GraphService) { }

  ngOnInit(): void {
    const width = this.visualiser?.nativeElement.offsetWidth;
    const height = this.visualiser?.nativeElement.offsetHeight;
    this.svg = d3.select('#visualiser')
      .append('svg')
        .attr('width', width)
        .attr('height', height);
    //this.graphService.generateGraph('tree', [6, 2])
    this.graphService.drawGraph(this.svg);
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

}
