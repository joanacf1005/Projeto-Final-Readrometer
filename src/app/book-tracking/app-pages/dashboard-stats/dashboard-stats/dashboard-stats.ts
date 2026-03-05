import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../new-book/new-book';  

export interface DashboardData {
  total: number;
  finished: number;
  toRead: number;
  reading: number;
  averageRating: number | null;
}

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,  // ← ADICIONADO!
  imports: [CommonModule],
  templateUrl: './dashboard-stats.html',
  styleUrl: './dashboard-stats.css'
})

export class DashboardStats implements OnInit {  
  
  stats: DashboardData = {
    total: 0,
    finished: 0,
    toRead: 0,
    reading: 0,
    averageRating: null
  };

  ngOnInit() {
    this.stats.total = this.calcTotalBooks();
    this.stats.finished = this.calcFinishedBooks();
    this.stats.toRead = this.calcToReadBooks();
    this.stats.reading = this.calcReadingBooks();
    this.stats.averageRating = this.calcAverageRating();
  }

  private getBooks(): Book[] {  
    return JSON.parse(localStorage.getItem('books') || '[]');
  }

  private getFinishedBooks(): Book[] {
    return this.getBooks().filter(book => book.status === 'Finished');
  }

  calcTotalBooks(): number {
    return this.getBooks().length;
  }

  calcFinishedBooks(): number {
    return this.getFinishedBooks().length;
  }

  calcToReadBooks(): number {
    return this.getBooks().filter(book => book.status === 'To Read').length;
  }

  calcReadingBooks(): number {
    return this.getBooks().filter(book => book.status === 'Reading').length;
  }

  calcAverageRating(): number | null {
    const finishedBooks = this.getFinishedBooks();
    
    if (finishedBooks.length === 0) return null;
    
    const soma = finishedBooks.reduce((total, book) => {
      const ratingNumber = Number(book.rating) || 0;  
      return total + ratingNumber;
    }, 0);
    
    const media = soma / finishedBooks.length;
    return parseFloat(media.toFixed(1));
  }
}
