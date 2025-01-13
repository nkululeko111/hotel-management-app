import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  imports: [RouterModule]
})
export class LandingPageComponent {
  constructor(private router: Router) {}

  bookHotel() {
    this.router.navigate(['/login']);
  }
}
