import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './book-gallery.html',
  styleUrl: './book-gallery.css'
})
export class BookGallery {
  filteredBooks: any[] = [];

  ngOnInit() {  
    this.filteredBooks = JSON.parse(localStorage.getItem('books') || '[]');
    console.log('Livros carregados:', this.filteredBooks);  
  }
}
