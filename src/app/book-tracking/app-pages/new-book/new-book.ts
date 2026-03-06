import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

export interface Book {
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
export class NewBook {
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

  constructor(private router: Router) {}

  get showRatingAndDate() {
    return this.form.get('status')?.value === 'Finished';
  }

  saveBook() {
    if (this.form.valid) {
      const books = JSON.parse(localStorage.getItem('books') || '[]');
      books.push(this.form.value);
      localStorage.setItem('books', JSON.stringify(books));
      console.log('Book Saved:', this.form.value);
      this.router.navigate(['/books']);
    } else {
      this.form.markAllAsTouched();
    }
  }
}


