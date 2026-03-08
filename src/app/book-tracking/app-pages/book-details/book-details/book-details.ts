import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../new-book/new-book';
import { Router, RouterLink} from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-book-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
})
export class BookDetails {
  book: Partial<Book> = {};
  bookId: string = "";

  constructor(private route: ActivatedRoute, private router: Router){}
  
  ngOnInit() {

    this.bookId = this.route.snapshot.paramMap.get('id') || '';
    
    const books = JSON.parse(localStorage.getItem('books') || '[]'); //carrega todos os livros
    
    const foundBook = books.find((b: Book) => b.id === this.bookId); //procura o id que dê match
    this.book = foundBook || {}; //recebe o livro
    
  }

  deleteBook(): void {
    if (confirm('Tem a certeza que quer apagar este livro?')) {
      const books = JSON.parse(localStorage.getItem('books') || '[]'); //recebe o livro
      
      const updatedBooks = books.filter((b: Book) => b.id !== this.bookId); //remove o livro que dê match ao id
      
      localStorage.setItem('books', JSON.stringify(updatedBooks)); //guarda tudo de novo
      
      console.log("Book deleted")

      this.router.navigate(['/books']);
    }
  }
}

