import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommandeRequestDTO } from 'src/app/models/commande.model';

@Injectable({ providedIn: 'root' })
export class CommandeService {
  private api = `${environment.apiBaseUrl}/commandes`;

  constructor(private http: HttpClient) {}

  create(dto: CommandeRequestDTO) {
    return this.http.post(this.api, dto);
  }
}
