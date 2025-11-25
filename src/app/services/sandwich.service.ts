import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sandwich } from '../model/sandwich.model';

@Injectable({
  providedIn: 'root'
})
export class SandwichService {
  private apiUrl = 'http://localhost:8081/api/sandwiches'
  constructor(private http: HttpClient) { }

  
  
  public getSandwiches() {
    return this.http.get<Sandwich[]>(`${this.apiUrl}`);
  }

  public getSandwich(id: number) {
    return this.http.get<Sandwich>(`${this.apiUrl}/${id}`);
  }
}
