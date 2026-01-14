import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TripService } from '../../services/trip.service';

@Component({
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatChipsModule,
    MatToolbarModule
  ],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.scss'

})
export class TripListComponent {
  service = inject(TripService);

  destination = '';
  start = '';
  end = '';
  activities: string[] = [];

  addActivity(a: string) {
    if (a) this.activities.push(a);
  }

  createTrip() {
    if (!this.destination || !this.start || !this.end) return;

    this.service.addTrip({
      id: 0,
      destination: this.destination,
      startDate: this.start,
      endDate: this.end,
      activities: this.activities
    });

    this.destination = '';
    this.start = '';
    this.end = '';
    this.activities = [];
  }
}
