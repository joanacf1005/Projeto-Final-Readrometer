import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterLink, Router } from '@angular/router';
import { Book } from '../../new-book/new-book';


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
  allBooks: Book[] = []; //todos os livros
  filteredBooks: Book[] = []; // todos os livros filtrados
  currentFilter: BookFilter = BookFilter.ALL;  // Filtro ativo

  isFiltersOpen = false; // Menu filtros mobile
  
  currentPage = 1;
  itemsPerPage = 6;

  toggleFilters() {
    this.isFiltersOpen = !this.isFiltersOpen;
  }

  constructor(private router: Router) {}

  get totalPages(): number {
    return Math.ceil(this.filteredBooks.length / this.itemsPerPage); 
  }

  get currentBooks(): Book[] {
    const start = (this.currentPage - 1) * this.itemsPerPage; //1o livro a ser mortrado ex: start = 0
    const end = start + this.itemsPerPage; //ultimo livro a ser mostrado ex: end = 6
    return this.filteredBooks.slice(start, end); //mostra a partir do 0, inclusive, até ao 6, excluindo o 6
  }
    //exemplo: const livros = [0, 1, 2, 3, 4, 5], (livros.slice(1,4)) Resultado: [1, 2, 3] 
  
  
  addNewBook() {
    this.router.navigate(['/new-book']);
  }

  
  ngOnInit() {  
    let books = JSON.parse(localStorage.getItem('books') || '[]');

    books = books.filter((book: Book, index: number, self: Book[]) =>  // remove duplicados pelo Id
      index === self.findIndex((b: Book) => b.id === book.id)
    );
    
    this.allBooks = books.reverse(); //inverte a ordem de que são mostrados
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

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1); 
  }
  
  trackByFn(index: number, book: Book): string {
    return `${book.id}-${index}`;  
  }
}
