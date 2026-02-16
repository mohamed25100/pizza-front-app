import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from 'src/app/core/services/produit.service';
import { CategorieService } from 'src/app/core/services/categorie.service';

@Component({
  selector: 'app-admin-produit-form',
  templateUrl: './admin-produit-form.component.html',
  styleUrls: ['./admin-produit-form.component.css']
})
export class AdminProduitFormComponent implements OnInit {

  id?: number;
  loading = false;
  errorMsg = '';

  categories: any[] = [];

  form = this.fb.group({
    nom: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(5)]],
    normalPrix: [0, [Validators.required, Validators.min(0)]],
    megaPrix: [0, [Validators.required, Validators.min(0)]],
    imageUrl: [''],
    idCategorie: [null as any, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService,
    private categorieService: CategorieService
  ) {}

  ngOnInit(): void {
    this.loadCategories();

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = Number(idParam);
      this.loadProduit(this.id);
    }
  }

  loadCategories() {
    this.categorieService.getAll().subscribe({
      next: (cats) => this.categories = cats,
      error: () => this.categories = []
    });
  }

  loadProduit(id: number) {
    this.loading = true;
    this.produitService.getById(id).subscribe({
      next: (p) => {
        this.form.patchValue({
          nom: p.nom,
          description: p.description,
          normalPrix: p.normalPrix,
          megaPrix: p.megaPrix,
          imageUrl: p.imageUrl ?? '',
          idCategorie: p.categorie?.idCategorie ?? p.categorie?.idCategorie ?? null
        });
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Produit introuvable';
        this.loading = false;
      }
    });
  }

  submit() {
    this.errorMsg = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dto = {
      nom: this.form.value.nom,
      description: this.form.value.description,
      normalPrix: Number(this.form.value.normalPrix),
      megaPrix: Number(this.form.value.megaPrix),
      imageUrl: this.form.value.imageUrl,
      idCategorie: Number(this.form.value.idCategorie)
    };

    this.loading = true;

    const req = this.id
      ? this.produitService.update(this.id, dto)
      : this.produitService.create(dto);

    req.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/admin/produits']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err?.error?.message ?? 'Erreur sauvegarde (droits admin / backend)';
      }
    });
  }
}
