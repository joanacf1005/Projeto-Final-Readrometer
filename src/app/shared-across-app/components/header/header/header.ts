import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(private router: Router) {}

  goDashboard() { this.router.navigate(['/']); }
  goLibrary() { this.router.navigate(['/books']); }
}
