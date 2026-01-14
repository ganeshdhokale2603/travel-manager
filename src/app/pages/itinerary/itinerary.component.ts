import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { TripService } from '../../services/trip.service';

@Component({
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, MatCardModule, MatButtonModule],
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.scss'

})
export class ItineraryComponent {
  tripService = inject(TripService);

  // Store input for each day
  newPlan: Record<string, string> = {};

  addPlan(date: string) {
    const plan = this.newPlan[date]?.trim();
    if (plan) {
      this.tripService.addPlan(date, plan); // Method to add plan in service
      this.newPlan[date] = ''; // Clear input
    }
  }
}
