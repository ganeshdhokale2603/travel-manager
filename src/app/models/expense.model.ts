export type Category = 'Food' | 'Travel' | 'Stay';

export interface Expense {
  id: number;
  tripId: number;
  category: Category;
  amount: number;
  description: string;
  date: string;

}
