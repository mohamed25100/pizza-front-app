export interface CategorieDTO {
  idCategorie: number;
  nom: string;
}

export interface ProduitResponseDTO {
  idProduit: number;
  nom: string;
  description: string;
  megaPrix: number;
  normalPrix: number;
  imageUrl?: string;
  categorie?: CategorieDTO;
}
