import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    console.log('ENV:', environment); 
    console.log('URL:', environment.supabaseUrl);
    console.log('KEY:', environment.supabaseKey);
    
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey!
    );
  }

  async login(username: string, password: string) {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single();
      
    if (error || !data) {
      return { data: null, error: { message: 'Credenciais inválidas' } };
    }
    
    localStorage.setItem('user', JSON.stringify(data));
    return { data, error: null };
  }

  async createAccount(username: string, password: string) {
    const { data: existing } = await this.supabase
      .from('users')
      .select('username')
      .eq('username', username)
      .single();
      
    if (existing) {
      return { data: null, error: { message: 'Username já existe' } };
    }
    
    const { data, error } = await this.supabase
      .from('users')
      .insert({ username, password })
      .select()
      .single();
      
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
    }
    
    return { data, error };
  }

  async getSession() {
    const user = localStorage.getItem('user');
    return user 
      ? { data: { session: { user: JSON.parse(user) } }, error: null }
      : { data: { session: null }, error: null };
  }

  async signOut() {
    localStorage.removeItem('user');
    return { error: null };
  }
}
