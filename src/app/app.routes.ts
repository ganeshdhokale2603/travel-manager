// import { Routes } from '@angular/router';
// import { TripListComponent } from './pages/trips.component';
// import { ItineraryComponent } from './pages/itinerary.component';
// import { ExpenseComponent } from './pages/expenses.component';
// import { DashboardComponent } from './pages/dashboard.component';

// export const routes: Routes = [
//   { path: '', redirectTo: 'trips', pathMatch: 'full' },
//   { path: 'trips', component: TripListComponent },
//   { path: 'itinerary/:id', component: ItineraryComponent },
//   { path: 'expenses/:id', component: ExpenseComponent },
//   { path: 'dashboard/:id', component: DashboardComponent }
// ];

import { Routes } from '@angular/router';
import { ExpensesComponent } from './pages/expenses/expenses.component';
import { TripListComponent } from './pages/trips/trips.component';
import { ItineraryComponent } from './pages/itinerary/itinerary.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'trips', component: TripListComponent },
  { path: 'itinerary', component: ItineraryComponent },
  { path: 'expenses', component: ExpensesComponent }
];
