import { Injectable, signal } from '@angular/core';
import { Trip } from '../models/trip.model';

export interface DayPlan {
  date: string;
  plans: string[];
}

@Injectable({ providedIn: 'root' })
export class TripService {
  private _trips = signal<Trip[]>([
    {
    id: 1,
    destination: 'Goa',
    startDate: '2025-01-10',
    endDate: '2025-01-15',
    activities: ['Beach', 'Cruise', 'Shopping'],
    description: 'A relaxing beach trip with fun activities',
    date: '2025-01-10'
  },
  {
    id: 2,
    destination: 'Dubai',
    startDate: '2025-02-05',
    endDate: '2025-02-10',
    activities: ['Desert Safari', 'Burj Khalifa', 'Mall of Emirates'],
    description: 'Explore the modern city and desert adventures',
    date: '2025-02-05'
  },
  {
    id: 3,
    destination: 'Singapore',
    startDate: '2025-03-12',
    endDate: '2025-03-18',
    activities: ['Sentosa', 'Universal Studios', 'Night Safari'],
    description: 'Family fun in the Lion City with theme parks and night safari',
    date: '2025-03-12'
  },
  {
    id: 4,
    destination: 'Manali',
    startDate: '2025-04-01',
    endDate: '2025-04-07',
    activities: ['Snow Trek', 'Solang Valley', 'Rohtang Pass'],
    description: 'Adventure trip in the mountains with snow activities',
    date: '2025-04-01'
  }
  ]);

  trips = this._trips.asReadonly();

  getTrips() {
    return this._trips.asReadonly();
  }

  addTrip(trip: Trip) {
    this._trips.update(t => [...t, { ...trip, id: Date.now() }]);
  }

  getTrip(id: number) {
    return this.trips().find(t => t.id === id);
  }


  deleteTrip(id: number) {
    this._trips.update(list => list.filter(t => t.id !== id));
  }

   private _itinerary = signal<DayPlan[]>([
    { date: '2026-01-10', plans: ['Arrive', 'Hotel Check-in'] },
    { date: '2026-01-11', plans: ['Beach', 'Dinner Cruise'] },
  ]);

  itinerary() {
    return this._itinerary();
  }

  addPlan(date: string, plan: string) {
    const days = this._itinerary();
    const day = days.find(d => d.date === date);
    if (day) {
      day.plans.push(plan);
      this._itinerary.set([...days]); // trigger UI update
    }
  }
}
