import { Component, inject, signal, computed, effect } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgFor, CurrencyPipe, NgIf, NgClass } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TravelDataService } from '../../services/travel-data.service';
import { AddExpenseDialog } from '../add-expense.dialog';
import { TripService } from '../../services/trip.service';
import { MATERIAL } from '../../material';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    FormsModule,
    NgFor,
    NgIf,
    NgClass,
    CurrencyPipe,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    ...MATERIAL
  ],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss'

})
export class ExpensesComponent {
  service = inject(TravelDataService);
  dialog = inject(MatDialog);
  tripService = inject(TripService);

  // Signal for selected trip
  selectedTrip = signal<number | null>(null);

  constructor() {
  effect(
    () => {
      const trips = this.tripService.trips();

      if (trips.length > 0 && this.selectedTrip() === null) {
        this.selectedTrip.set(trips[0].id);
      }
    },
    { allowSignalWrites: true }   // ✅ this fixes NG0600
  );
}

  // Computed signal for expenses of selected trip (reactive)
  expensesForSelectedTrip = computed(() => {
    const tripId = this.selectedTrip();
    return tripId !== null ? this.service.getExpensesForTrip(tripId) : [];
  });

  // Computed signal for total amount of selected trip (reactive)
  totalForSelectedTrip = computed(() => {
    const tripId = this.selectedTrip();
    return tripId !== null ? this.service.total(tripId) : 0;
  });

  open() {
    this.dialog.open(AddExpenseDialog, {
      data: { tripId: this.selectedTrip }
    })
    .afterClosed()
    .subscribe(result => {
      if (result) {
        this.service.addExpense(result);
        // UI automatically updates because expensesForSelectedTrip is computed
      }
    });
  }

  getIcon(category: string) {
  switch (category) {
    case 'Food': return 'restaurant';
    case 'Travel': return 'directions_car';
    case 'Stay': return 'hotel';
    default: return 'receipt';
  }
}
}
