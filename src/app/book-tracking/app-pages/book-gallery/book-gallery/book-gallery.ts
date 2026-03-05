import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';

enum BookFilter {
  ALL = 'all',
  FINISHED = 'finished', 
  TO_READ = 'toRead',
  READING = 'reading'
}

@Component({
  selector: 'app-book-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './book-gallery.html',
  styleUrl: './book-gallery.css'
})

export class BookGallery implements OnInit {
  allBooks: any[] = [];
  filteredBooks: any[] = [];
  currentFilter: BookFilter = BookFilter.ALL;  
  
  ngOnInit() {  
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    this.allBooks = books;
    this.filteredBooks = [...books];
  }

  
  filterBooks(filter: string) { 
    this.currentFilter = filter as BookFilter;  
    
    switch(filter) {
      case 'all':
        this.filteredBooks = [...this.allBooks];
        break;
      case 'finished':
        this.filteredBooks = this.allBooks.filter(b => b.status === 'Finished');
        break;
      case 'toRead':
        this.filteredBooks = this.allBooks.filter(b => b.status === 'To Read');
        break;
      case 'reading':
        this.filteredBooks = this.allBooks.filter(b => b.status === 'Reading');
        break;
    }
  }
}
