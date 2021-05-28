import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  // Functions use to display the rules
  private getRulesHtml() {
    return 'Need to add the rules...';
  }

  displayRules() {
    Swal.fire({
      icon: 'info',
      text: this.getRulesHtml()
    })
  }
}
