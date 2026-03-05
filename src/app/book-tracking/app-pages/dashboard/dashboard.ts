import { Component } from '@angular/core';
import { DashboardStats } from '../dashboard-stats/dashboard-stats/dashboard-stats';

@Component({
  selector: 'app-dashboard',
  imports: [ DashboardStats ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {}
