import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgIf } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { MATERIAL } from '../../material';

@Component({
  standalone: true,
  imports: [NgIf, NgChartsModule, ...MATERIAL],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
  })
export class DashboardComponent {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  // ---------------- PIE CHART ----------------
  pieData: ChartData<'pie', number[], string> = {
    labels: ['Food', 'Travel', 'Stay'],
    datasets: [
      {
        data: [500, 1500, 4000],
        backgroundColor: ['#FF6384','#36A2EB','#FFCE56'],
        hoverOffset: 20
      }
    ]
  };
  pieOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom', labels: { font: { size: 14 } } },
      tooltip: { enabled: true, mode: 'nearest' }
    },
    animation: { animateRotate: true, animateScale: true }
  };


}
