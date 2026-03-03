import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-book-gallery',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './book-gallery.html',
  styleUrl: './book-gallery.css'
})
export class BookGallery {
  filteredBooks: any = [];  
  
  openAddBookModal() { 
    console.log('Abrir modal');
  }
}
