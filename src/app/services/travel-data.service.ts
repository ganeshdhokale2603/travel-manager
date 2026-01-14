import { Injectable, signal } from '@angular/core';

export interface Expense {
  tripId: number;
  category: 'Food' | 'Travel' | 'Stay';
  amount: number;
  note: string;
  date?: string;
}

@Injectable({ providedIn: 'root' })
export class TravelDataService {
  budget = 20000;

  private _expenses = signal<Expense[]>([
    { tripId: 1, category: 'Food', amount: 500, note: 'Lunch' },
    { tripId: 1, category: 'Travel', amount: 1500, note: 'Taxi' },
    { tripId: 1, category: 'Stay', amount: 4000, note: 'Hotel' },

    // Dubai (2)
  { tripId: 2, category: 'Travel', amount: 12000, note: 'Flight' },
  { tripId: 2, category: 'Stay', amount: 8000, note: 'Hotel' },
  { tripId: 2, category: 'Food', amount: 2500, note: 'Restaurants' },

  // Singapore (3)
  { tripId: 3, category: 'Travel', amount: 18000, note: 'Flight' },
  { tripId: 3, category: 'Stay', amount: 9000, note: 'Hotel' },
  { tripId: 3, category: 'Food', amount: 3000, note: 'Street food' },

  // Manali (4)
  { tripId: 4, category: 'Travel', amount: 3000, note: 'Bus' },
  { tripId: 4, category: 'Stay', amount: 6000, note: 'Resort' },
  { tripId: 4, category: 'Food', amount: 2000, note: 'Local food' }
  ]);

  readonly expenses = this._expenses.asReadonly();

  // ➕ Add new expense
  addExpense(exp: Expense) {
    this._expenses.update(list => [...list, exp]);
  }

  // 🧾 Expenses for selected trip
  getExpensesForTrip(tripId: number | null) {
    if (tripId === null) return [];
    return this._expenses().filter(e => e.tripId === tripId);
  }

  // 💰 Total for selected trip
  total(tripId: number | null) {
    if (tripId === null) return 0;
    return this.getExpensesForTrip(tripId)
      .reduce((sum, e) => sum + e.amount, 0);
  }

  // 📊 Overall totals (optional)
  getSpent() {
    return this._expenses().reduce((s, e) => s + e.amount, 0);
  }

  getRemaining() {
    return this.budget - this.getSpent();
  }
}
