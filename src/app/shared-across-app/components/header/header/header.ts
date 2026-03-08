import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit {
  constructor(private router: Router) {}

  isDarkMode = false;
  isMenuOpen = false;  

  toggleMenu() {       
    this.isMenuOpen = !this.isMenuOpen;
  }


  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.isDarkMode = localStorage.getItem('theme') === 'dark' || false;
      document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    }
  }

  toggleTheme(): void {
    if (typeof window !== 'undefined') {
      this.isDarkMode = !this.isDarkMode;
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
    }
  }

  goDashboard() { this.router.navigate(['/']); }
  goLibrary() { this.router.navigate(['/books']); }
}
