import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

// --- DTOs (adapte les imports selon ton projet) ---
export interface LoginRequestDTO {
  email: string;
  motDePasse: string;
}

export interface UserRequestDTO {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  adresse?: string;
  telephone?: string;
}

export interface UserResponseDTO {
  idUser: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  adresse?: string;
  telephone?: string;
}

export interface AuthResponseDTO {
  token: string;
  type?: string; // "Bearer" (optionnel)
  user: UserResponseDTO;
}

const TOKEN_KEY = 'sp_token';
const USER_KEY = 'sp_user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = `${environment.apiBaseUrl}/auth`;

  private tokenSubject = new BehaviorSubject<string | null>(this.readToken());
  private userSubject = new BehaviorSubject<UserResponseDTO | null>(this.readUser());

  // Observables pour navbar / composants
  token$ = this.tokenSubject.asObservable();
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  // --- getters simples ---
  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getCurrentUser(): UserResponseDTO | null {
    return this.userSubject.value;
  }

  // --- helpers auth ---
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const role = (this.getCurrentUser()?.role ?? '').toUpperCase();
    return role.includes('ADMIN');
  }

  // --- API calls ---
  login(payload: LoginRequestDTO): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(`${this.api}/login`, payload).pipe(
      tap((res) => {
        this.persist(res.token, res.user);
      })
    );
  }

  register(payload: UserRequestDTO): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>(`${this.api}/register`, payload);
  }

  logout(redirectTo: string = '/'): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.tokenSubject.next(null);
    this.userSubject.next(null);
    this.router.navigate([redirectTo]);
  }

  // --- persistence ---
  private persist(token: string, user: UserResponseDTO): void {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.tokenSubject.next(token);
    this.userSubject.next(user);
  }

  private readToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private readUser(): UserResponseDTO | null {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserResponseDTO;
    } catch {
      return null;
    }
  }
}
