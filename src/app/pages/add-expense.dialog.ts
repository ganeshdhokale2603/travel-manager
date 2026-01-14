import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { MATERIAL } from '../material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    MatDialogModule,...MATERIAL
  ],
  template: `
  <h2 mat-dialog-title>Add Expense</h2>

  <mat-dialog-content class="dialog">
    <mat-form-field appearance="outline">
      <mat-label>Category</mat-label>
      <mat-select [(ngModel)]="category">
        <mat-option *ngFor="let c of categories" [value]="c">
          {{c}}
        </mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>Amount</mat-label>
      <input matInput type="number" [(ngModel)]="amount">
    </mat-form-field>

    <mat-form-field appearance="outline">
      <mat-label>Note</mat-label>
      <input matInput [(ngModel)]="note">
    </mat-form-field>
  </mat-dialog-content>

  <mat-dialog-actions align="end">
    <button mat-button mat-dialog-close>Cancel</button>
    <button mat-raised-button color="primary" (click)="save()">Save</button>
  </mat-dialog-actions>
  `,
  styles: [`
    .dialog {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 300px;
    }
  `]
})
export class AddExpenseDialog {
  categories = ['Food', 'Travel', 'Stay', 'Shopping', 'Other'];

  category = '';
  amount = 0;
  note = '';
  description = '';

  constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  private ref: MatDialogRef<AddExpenseDialog>
) {}

  save() {
  this.ref.close({
    id: Date.now(),
    tripId: this.data.tripId,
    category: this.category,
    amount: this.amount,
    description: this.description,
    date: new Date().toISOString().substring(0, 10)
  });
}

}
