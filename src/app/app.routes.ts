import { Routes } from '@angular/router';
import { Dashboard } from './book-tracking/app-pages/dashboard/dashboard';
import { BookGallery } from './book-tracking/app-pages/book-gallery/book-gallery/book-gallery';
import { NewBook } from './book-tracking/app-pages/new-book/new-book';

export const routes: Routes = [
  { path: '', component: Dashboard },     
  { path: 'books', component: BookGallery },
  { path: 'new-book', component: NewBook }, 
  { path: '**', redirectTo: '' }          
];
