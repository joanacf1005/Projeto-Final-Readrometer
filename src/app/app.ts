import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared-across-app/components/header/header/header';
import { Footer } from './shared-across-app/components/footer/footer';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('readrometer');
  
  // Login/Register state
  username = '';
  password = '';
  registerMode = false;
  isLoggedIn = false;
  userNameDisplay = '';

   constructor(private cdr: ChangeDetectorRef) {}

  async login() {
    console.log('🔥 LOGIN CLICADO!', this.username, this.password); // ← ADICIONE
    
    if (!this.username || !this.password) {
      alert('Fill in the fields!');
      return;
    }

    try {
      console.log('🌐 Fazendo fetch para:', `${environment.apiUrl}/users?username=${this.username}&password=${this.password}`);
      const resp = await fetch(`${environment.apiUrl}/users?username=${this.username}&password=${this.password}`);
      const users = await resp.json();
      console.log('📊 Usuários encontrados:', users); // ← ADICIONE

      if (users && users.length > 0) {
        console.log('✅ LOGIN OK!');
        this.isLoggedIn = true;
        this.userNameDisplay = `, ${users[0].username}`;
        this.loadData();
        this.cdr.detectChanges();
      } else {
        alert('Username or password incorrect!');
      }
    } catch (error) {
      console.error('❌ ERRO:', error);
      alert('API connection error. Check if json-server is running.');
    }
  }


  async createAccount() {
    if (!this.username || !this.password) return;

    try {
      const check = await fetch(`${environment.apiUrl}/users?username=${this.username}`);
      const existing = await check.json();

      if (existing.length > 0) {
        alert('This user already exists!');
        return;
      }

      await fetch(`${environment.apiUrl}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      });

      alert('Account created successfully!');
      this.registerMode = false;
    } catch {
      alert('Error creating new user.');
    }
  }

  loadData() {
    console.log('Data loaded for:', this.userNameDisplay);
  }

  toggleRegisterMode() {
    this.registerMode = !this.registerMode;
    this.username = '';
    this.password = '';
  }

  logout() {
    this.isLoggedIn = false;
    this.username = '';
    this.password = '';
    this.userNameDisplay = '';
  }
}
