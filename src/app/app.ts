import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared-across-app/components/header/header/header';
import { Footer } from './shared-across-app/components/footer/footer';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from './services/supabase'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('readrometer');
  
  username = '';
  password = '';
  registerMode = false;
  isLoggedIn = false;
  userNameDisplay = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private supabaseService: SupabaseService
  ) {
    this.checkExistingSession();
  }

  private async checkExistingSession() {
    try {
      const { data: { session } } = await this.supabaseService.getSession();
      if (session?.user) {
        this.isLoggedIn = true;
        this.userNameDisplay = `, ${session.user.username || session.user.email || 'User'}`;
        this.loadData();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async login() {
    if (!this.username || !this.password) {
      alert('Fill in all the input fields!');
      return;
    }

    try {
      const { data, error } = await this.supabaseService.login(
        this.username, 
        this.password
      );

      if (error || !data) {
        console.error('Login error:', error);
        alert('Incorrect Username or Password');
        return;
      }

      this.isLoggedIn = true;
      this.userNameDisplay = `, ${data.username}`;
      this.loadData();
      this.cdr.detectChanges();
    } catch (error) {
      console.error('ERROR:', error);
      alert('Connection error.');
    }
  }

  async createAccount() {
    if (!this.username || !this.password) {
      alert('Fill in all the input fields!');
      return;
    }

    try {
      const { data, error } = await this.supabaseService.createAccount(
        this.username, 
        this.password
      );

      if (error || !data) {
        console.error('Error creating account:', error);
        alert(error?.message || 'Error creating account!');
        return;
      }

      alert('Account Created!');
      this.registerMode = false;
      this.username = '';
      this.password = '';
      this.cdr.detectChanges();
    } catch (error) {
      console.error('ERROR:', error);
      alert('Error creating account.');
    }
  }

  async logout() {
    try {
      await this.supabaseService.signOut();
    } catch (error) {
      console.error('Logout Error:', error);
    } finally {
      this.isLoggedIn = false;
      this.username = '';
      this.password = '';
      this.userNameDisplay = '';
      this.cdr.detectChanges();
    }
  }

  loadData() {
    const books = JSON.parse(localStorage.getItem('books') || '[]');
    console.log('Books loaded:', books.length, 'for', this.userNameDisplay);
  }

  toggleRegisterMode() {
    this.registerMode = !this.registerMode;
    this.username = '';
    this.password = '';
  }
}

// let yes = "?"
let no = "!"