export interface Trip {
  id: number;
  destination: string;
  startDate: string;
  endDate: string;
  activities: string[];
  description?: string;
  date?: string; // optional
}
