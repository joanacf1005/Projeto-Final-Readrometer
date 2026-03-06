import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared-across-app/components/header/header/header';
import { Footer } from './shared-across-app/components/footer/footer';
import { NewBook } from './book-tracking/app-pages/new-book/new-book';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}

