import { Component, OnInit } from '@angular/core';
import { ProduitService } from 'src/app/core/services/produit.service';

@Component({
  selector: 'app-admin-produits-list',
  templateUrl: './admin-produits-list.component.html',
  styleUrls: ['./admin-produits-list.component.css']
})
export class AdminProduitsListComponent implements OnInit {

  produits: any[] = [];
  loading = false;
  errorMsg = '';

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    this.errorMsg = '';
    this.produitService.getAll().subscribe({
      next: (data) => { this.produits = data; this.loading = false; },
      error: () => { this.errorMsg = 'Impossible de charger les produits'; this.loading = false; }
    });
  }

  delete(idProduit: number) {
    if (!confirm('Supprimer ce produit ?')) return;

    this.produitService.delete(idProduit).subscribe({
      next: () => this.load(),
      error: () => alert('Suppression impossible (droits admin / backend)')
    });
  }
}
