import { Component } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  // funcionamiento de los botones
  myNumber: number = 0;

  increment() {
    this.myNumber++;
  }

  decrement() {
    if (this.myNumber > 0) {
      this.myNumber--;
    }
  }
}
