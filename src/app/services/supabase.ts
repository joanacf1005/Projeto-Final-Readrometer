import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
     // Debug
    console.log('ENV:', environment); 
    console.log('URL:', environment.supabaseUrl);
    console.log('KEY:', environment.supabaseKey);
    
    // Cria cliente Supabase com URL e chave do ambiente
    this.supabase = createClient(
      environment.supabaseUrl,  // URL do projeto
      environment.supabaseKey!  // Chave pública (anon key)
    );
  }

   // Login: verifica username e password na tabela users
  async login(username: string, password: string) {
    // FAZ QUERY: procura 1 registo na tabela 'users'
    const { data, error } = await this.supabase
      .from('users')  // Seleciona tabela users
      .select('*')                      // Pega todos os campos (*)
      .eq('username', username)         // Onde username = parâmetro
      .eq('password', password)         // E password = parâmetro 
      .single();                        // Retorna só 1 resultado
      
     // SE der erro OU não encontrar user
    if (error || !data) {
      // Retorna objeto com erro
      return { data: null, error: { message: 'Invalid Credentials' } };
    }
    
    // Salva user no localStorage
    localStorage.setItem('user', JSON.stringify(data));
    // Retorna sucesso com dados do user
    return { data, error: null };
  }

  async createAccount(username: string, password: string) {
    // Verifica se já existe 
    const { data: existing } = await this.supabase
      .from('users')                    // Tabela users
      .select('username')               // Só campo username
      .eq('username', username)         // Username informado
      .single();                        // 1 resultado
      
     // SE username já existe
    if (existing) {
      return { data: null, error: { message: 'Already exists' } };
    }
    
    // Insere novo usuário
    const { data, error } = await this.supabase
      .from('users')// Tabela users
      .insert({ username, password })    // INSERE novo registo
      .select()                          // Retorna o registo criado
      .single();                         // Só 1 resultado
      
    // SE criou com sucesso, salva na localStorage
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
    }
    
    // Retorna resultado da operação
    return { data, error };
  }

  // Recupera sessão do localStorage
  async getSession() {
    // procura user salvo no localStorage
    const user = localStorage.getItem('user');
    return user 
      ? { data: { session: { user: JSON.parse(user) } }, error: null } // User completo
      : { data: { session: null }, error: null }; // SE não tem user logado
  }

// Logout: remove user do localStorage
  async signOut() {
    localStorage.removeItem('user');
    return { error: null };
  }
}
