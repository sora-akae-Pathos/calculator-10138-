import { Component } from '@angular/core';
import { CalcComponent } from './calc_component';

@Component({
  selector: 'app-root',
  imports: [CalcComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}