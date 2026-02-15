import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs'; 
import { ProduitService } from 'src/app/core/services/produit.service';
import { ProduitResponseDTO } from 'src/app/models/produit.model';

type Tab = 'PIZZA' | 'SANDWICH';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  tab: Tab = 'PIZZA';

  produits$!: Observable<ProduitResponseDTO[]>;
  pizzas$!: Observable<ProduitResponseDTO[]>;
  sandwiches$!: Observable<ProduitResponseDTO[]>;
  displayed$!: Observable<ProduitResponseDTO[]>;

  constructor(private produitService: ProduitService) {}

  ngOnInit(): void {
    this.produits$ = this.produitService.getAll();

    this.pizzas$ = this.produits$.pipe(
      map(list => list.filter(p => (p.categorie?.nom ?? '').toLowerCase().includes('pizza')))
    );

    this.sandwiches$ = this.produits$.pipe(
      map(list => list.filter(p => (p.categorie?.nom ?? '').toLowerCase().includes('sandwich')))
    );

    this.displayed$ = this.pizzas$;
  }

  selectTab(tab: Tab) {
    this.tab = tab;
    this.displayed$ = (tab === 'PIZZA') ? this.pizzas$ : this.sandwiches$;
  }

  trackById(_: number, p: ProduitResponseDTO) {
    return p.idProduit;
  }
}
