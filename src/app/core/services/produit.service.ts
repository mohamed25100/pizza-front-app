import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ProduitResponseDTO } from '../../models/produit.model';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private apiUrl = `${environment.apiBaseUrl}/produits`;

  constructor(private http: HttpClient) {}

  /**
   * Récupérer tous les produits (menu public)
   */
  getAll(): Observable<ProduitResponseDTO[]> {
    return this.http.get<ProduitResponseDTO[]>(this.apiUrl);
  }

  /**
   * Récupérer produits par catégorie
   */
  getByCategorie(idCategorie: number): Observable<ProduitResponseDTO[]> {
    return this.http.get<ProduitResponseDTO[]>(
      `${this.apiUrl}/categorie/${idCategorie}`
    );
  }

  /**
   * Rechercher produit par mot-clé
   */
  search(keyword: string): Observable<ProduitResponseDTO[]> {
    return this.http.get<ProduitResponseDTO[]>(
      `${this.apiUrl}?keyword=${keyword}`
    );
  }

  /**
   * Ajouter produit (ADMIN)
   */
  create(produit: any): Observable<ProduitResponseDTO> {
    return this.http.post<ProduitResponseDTO>(this.apiUrl, produit);
  }

  /**
   * Supprimer produit (ADMIN)
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Modifier produit (ADMIN)
   */
  update(id: number, produit: any): Observable<ProduitResponseDTO> {
    return this.http.put<ProduitResponseDTO>(
      `${this.apiUrl}/${id}`,
      produit
    );
  }
}
