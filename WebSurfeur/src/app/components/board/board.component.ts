import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game/game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(private router: Router, private gameService: GameService) { }

  ngOnInit(): void {
    console.log('INIT')
  }

  replay(): void {
    this.ngOnInit();
    /* this.router.navigate(['/board']) */
  }

  goBackToMenu(): void {
    this.router.navigate(['/configuration']);
  }

}
