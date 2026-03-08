import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../new-book/new-book'; 
import { Router, RouterLink } from '@angular/router';

export interface DashboardData {
  total: number;
  finished: number;
  toRead: number;
  reading: number;
  averageRating: number | null;
}

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,  
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-stats.html',
  styleUrl: './dashboard-stats.css'
})

export class DashboardStats implements OnInit {  
  
  stats: DashboardData = {
    total: 0,
    finished: 0,
    toRead: 0,
    reading: 0,
    averageRating: null
  };

  ngOnInit() {
    this.stats.total = this.calcTotalBooks();
    this.stats.finished = this.calcFinishedBooks();
    this.stats.toRead = this.calcToReadBooks();
    this.stats.reading = this.calcReadingBooks();
    this.stats.averageRating = this.calcAverageRating();
  }

  private getBooks(): Book[] {  //vai buscar todos os livros
    return JSON.parse(localStorage.getItem('books') || '[]');
  }

  private getFinishedBooks(): Book[] { //vai buscar os livros lidos
    return this.getBooks().filter(book => book.status === 'Finished');
  }

  calcTotalBooks(): number { 
    return this.getBooks().length;
  }

  calcFinishedBooks(): number {
    return this.getFinishedBooks().length; //guarda o valor do tamanho do array que a função de cima devolve
  }

  calcToReadBooks(): number { 
    return this.getBooks().filter(book => book.status === 'To Read').length; //filtra pelos livros a ler e guarda o valor do tamanho
  }

  calcReadingBooks(): number {
    return this.getBooks().filter(book => book.status === 'Reading').length; //filtra pelos livros a ser lidos e guarda o valor do tamanho
  }

  calcAverageRating(): number | null {
    const finishedBooks = this.getFinishedBooks();
    
    if (finishedBooks.length === 0) {
      return null;
    }
    
    const soma = finishedBooks.reduce((total, book) => { //percorre todos os livros terminados e por cada livro
      const ratingNumber = Number(book.rating) || 0;  // converte rating em numero
      return total + ratingNumber; //soma e continua
    }, 0); //total começa a zero
    
    const media = soma / finishedBooks.length; //recebe a soma de cima e divide pelo numero de livros acabados
    return parseFloat(media.toFixed(1)); //mostra uma casa decimal 
  }
}
