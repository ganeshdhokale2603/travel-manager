import { Injectable, signal } from '@angular/core';

export interface ItineraryDay {
  date: string;
  plans: string[];
}

@Injectable({ providedIn: 'root' })
export class ItineraryService {
  private _days = signal<ItineraryDay[]>([
    { date: '2026-01-10', plans: ['Arrive', 'Hotel Check-in'] },
    { date: '2026-01-11', plans: ['Beach', 'Dinner Cruise'] }
  ]);

  days = this._days.asReadonly();

  addPlan(date: string, plan: string) {
    this._days.update(list =>
      list.map(d =>
        d.date === date ? { ...d, plans: [...d.plans, plan] } : d
      )
    );
  }
}
