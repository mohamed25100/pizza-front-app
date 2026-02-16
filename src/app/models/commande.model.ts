export interface LigneCommandeRequestDTO {
  idProduit: number;
  quantite: number;
}

export interface CommandeRequestDTO {
  lignes: LigneCommandeRequestDTO[];
}
