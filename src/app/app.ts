import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared-across-app/components/header/header/header';
import { NewBook } from './book-tracking/app-pages/new-book/new-book';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}

