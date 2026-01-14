import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { Location } from '@angular/common';
import { MATERIAL } from './material';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, ...MATERIAL],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'travel-manager';

  constructor(private router: Router, private location: Location) {}


  goHome() {
    this.router.navigate(['/trips']);
  }

  goBack() {
    this.location.back();
  }

}
