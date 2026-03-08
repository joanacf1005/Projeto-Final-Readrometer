import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

export interface Book {
  id: string;
  title: string;
  author: string;
  edition: string;
  description: string;
  photo: string;
  status: 'To Read' | 'Reading' | 'Finished';
  rating: number;
  completionDate?: string;
}

@Component({
  selector: 'app-new-book',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './new-book.html',
  styleUrls: ['./new-book.css'],
})
export class NewBook implements OnInit{
  form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    author: new FormControl('', [Validators.required, Validators.minLength(3)]),
    edition: new FormControl('', [Validators.required]),
    photo: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.maxLength(1000)]),
    status: new FormControl('', [Validators.required]),
    rating: new FormControl('', []),
    completionDate: new FormControl('', []),
  });

  isEditMode = false; 
  editingBookId = '';  

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {    
    const urlParts = window.location.pathname.split('/');
    
    const idIndex = urlParts.indexOf('new-book');
    if (idIndex !== -1 && idIndex + 1 < urlParts.length) {
      this.editingBookId = urlParts[idIndex + 1];
      
      if (this.editingBookId) {
        this.isEditMode = true;
        this.loadBookToEdit();
      }
    }
  }

  loadBookToEdit(): void { 
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    
    const book = books.find((b: Book) => b.id === this.editingBookId);
    
    if (book) {
      this.form.patchValue(book);
    } else {
      console.log('Book not found!');
    }
  }

  get showRatingAndDate() {
    return this.form.get('status')?.value === 'Finished';
  }

  saveBook() {
    if (this.form.valid) {
      const books = JSON.parse(localStorage.getItem('books') || '[]');
      
      if (this.isEditMode && this.editingBookId) {
        
        console.log('Updating:', this.editingBookId);
        
        const bookData = {
          id: this.editingBookId,  
          title: this.form.value.title || "",
          author: this.form.value.author || "",
          edition: this.form.value.edition || "",
          photo: this.form.value.photo || "",
          description: this.form.value.description || "",
          status: this.form.value.status as 'To Read' | 'Reading' | 'Finished',
          rating: this.form.value.rating ? Number(this.form.value.rating) : 0,
          completionDate: this.form.value.completionDate || undefined
        };
        
        // Atualiza o livro existente
        const updatedBooks = books.map((b: Book) => 
          b.id === this.editingBookId ? bookData : b
        );
        
        localStorage.setItem('books', JSON.stringify(updatedBooks));
        console.log('Book Updated:', bookData);
        
      } else {
        
        console.log('New Book');
        
        const newBook: Book = {
          id: crypto.randomUUID(),
          title: this.form.value.title || "",
          author: this.form.value.author || "",
          edition: this.form.value.edition || "",
          photo: this.form.value.photo || "",
          description: this.form.value.description || "",
          status: this.form.value.status as 'To Read' | 'Reading' | 'Finished',
          rating: this.form.value.rating ? Number(this.form.value.rating) : 0,
          completionDate: this.form.value.completionDate || undefined
        };
        
        //Adiciona se não existir
        const exists = books.some((b: Book) => b.id === newBook.id);
        if (!exists) {
          books.push(newBook);
          localStorage.setItem('books', JSON.stringify(books));
          console.log('Book Created:', newBook);
        }
      }
      
      window.location.href = '/books';
      
    } else {
      this.form.markAllAsTouched();
    }
  }

}


