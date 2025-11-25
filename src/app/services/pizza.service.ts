import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pizza } from '../model/pizza.model';
@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiUrl = 'http://localhost:8081/api/pizzas';
  constructor(private http: HttpClient) { }

  public getPizzas() {
    return this.http.get<Pizza[]>(`${this.apiUrl}`);
  }

  public getPizzaById(id: number) {
    return this.http.get<Pizza>(`${this.apiUrl}/${id}`);
  }
  delete(id: number, keyword: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  public updatePizza(id: number, pizza: Pizza) {
    return this.http.put(`${this.apiUrl}/${id}`, pizza);
  }

}
