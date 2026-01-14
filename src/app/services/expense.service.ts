import { Injectable, signal, computed, Signal } from '@angular/core';
import { Expense } from '../models/expense.model';

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private expenses = signal<Expense[]>([// Goa
  { id: 1, tripId: 1, category: 'Food', amount: 1200, description: 'Beach Lunch', date: '2025-01-11' },
  { id: 2, tripId: 1, category: 'Travel', amount: 2000, description: 'Scooter Rental', date: '2025-01-11' },
  { id: 3, tripId: 1, category: 'Stay', amount: 6500, description: 'Resort Stay', date: '2025-01-10' },

  // Dubai
  { id: 4, tripId: 2, category: 'Travel', amount: 15000, description: 'Flight Tickets', date: '2025-02-05' },
  { id: 5, tripId: 2, category: 'Stay', amount: 18000, description: 'Hotel', date: '2025-02-06' },
  { id: 6, tripId: 2, category: 'Food', amount: 4000, description: 'Restaurant Meals', date: '2025-02-06' },

  // Singapore
  { id: 7, tripId: 3, category: 'Stay', amount: 22000, description: 'Hotel', date: '2025-03-12' },
  { id: 8, tripId: 3, category: 'Food', amount: 6000, description: 'Hawker Food', date: '2025-03-13' },
  { id: 9, tripId: 3, category: 'Travel', amount: 8000, description: 'Universal Studios', date: '2025-03-14' },

  // Manali
  { id: 10, tripId: 4, category: 'Travel', amount: 6000, description: 'Volvo Bus', date: '2025-04-01' },
  { id: 11, tripId: 4, category: 'Stay', amount: 9000, description: 'Hotel', date: '2025-04-02' },
  { id: 12, tripId: 4, category: 'Food', amount: 3000, description: 'Local Cafes', date: '2025-04-03' }
  ]);

 getTripExpenses(tripId: number): Expense[] {
  return this.expenses().filter((e: Expense) => e.tripId === tripId);
}


  addExpense(exp: Expense) {
    this.expenses.update(e => [...e, exp]);
  }

  getSummary(tripId: number) {
    return computed(() => {
      const list = this.expenses().filter(e => e.tripId === tripId);
      return {
        Food: list.filter(e => e.category === 'Food').reduce((a, b) => a + b.amount, 0),
        Travel: list.filter(e => e.category === 'Travel').reduce((a, b) => a + b.amount, 0),
        Stay: list.filter(e => e.category === 'Stay').reduce((a, b) => a + b.amount, 0)
      };
    });
  }

  budget = 20000;

getTotal(tripId: number) {
  return computed(() =>
    this.expenses()
      .filter(e => e.tripId === tripId)
      .reduce((sum, e) => sum + e.amount, 0)
  );
}

getExpensesForTrip(tripId: number | null) {
  if (tripId === null) return [];
  return this.expenses().filter(e => e.tripId === tripId);
}

total(tripId: number | null) {
  if (tripId === null) return 0;

  return this.expenses()
    .filter(e => e.tripId === tripId)
    .reduce((sum, e) => sum + e.amount, 0);
}

}
