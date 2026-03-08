import { Component, OnInit } from '@angular/core';
import { DashboardStats } from '../dashboard-stats/dashboard-stats/dashboard-stats';
import { Book } from '../new-book/new-book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [ DashboardStats ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard implements OnInit {
  lastBook: Book | null = null;

  constructor(private router: Router) {}

  goToBookDetails(bookId: string | undefined) {
    if (bookId) {
      console.log('Indo para:', bookId);
      this.router.navigate(['/books', bookId]);  // ← /books/[ID]
    }
  }

  ngOnInit(): void {
    const books: Book[] = JSON.parse(localStorage.getItem('books') || '[]');
    this.lastBook = books[books.length - 1] || null;
  }

   getRating(rating: number): string {
    return 'You rated this book: ' + rating + '/5 💜';
  }
}
